
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getMethodByName } from "@/utils/apiMethods";
import { ApiResponse, callTelegramApi } from "@/services/telegramApi";
import { AlertCircle, HelpCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApiFormProps {
  methodName: string;
  botToken: string;
  onResponse: (response: ApiResponse) => void;
}

const ApiForm = ({ methodName, botToken, onResponse }: ApiFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string | number | boolean>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [lastUsedParams, setLastUsedParams] = useState<Record<string, Record<string, string | number | boolean>>>({});
  const method = getMethodByName(methodName);

  // Load last used parameters for this method
  useEffect(() => {
    const savedParams = localStorage.getItem(`telegram_params_${methodName}`);
    if (savedParams) {
      try {
        const parsed = JSON.parse(savedParams);
        setParamValues(parsed);
      } catch (e) {
        console.error(`Failed to parse saved params for ${methodName}:`, e);
      }
    } else {
      // If no saved params for this method, reset form
      setParamValues({});
    }
    setValidationErrors({});
  }, [methodName]);

  // Load all saved parameters from localStorage
  useEffect(() => {
    const allMethods: Record<string, Record<string, string | number | boolean>> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('telegram_params_')) {
        const methodName = key.replace('telegram_params_', '');
        try {
          const params = JSON.parse(localStorage.getItem(key) || '{}');
          allMethods[methodName] = params;
        } catch (e) {
          console.error(`Failed to parse saved params for ${methodName}:`, e);
        }
      }
    }
    setLastUsedParams(allMethods);
  }, []);

  if (!method) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Method not found: {methodName}</p>
        </CardContent>
      </Card>
    );
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    method.parameters.forEach(param => {
      if (param.required && (!paramValues[param.name] || paramValues[param.name] === "")) {
        errors[param.name] = "This field is required";
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (name: string, value: string, type: string) => {
    let processedValue: string | number | boolean = value;
    
    if (type === 'number' && value) {
      processedValue = parseFloat(value);
    } else if (type === 'boolean') {
      processedValue = value === 'true';
    }
    
    setParamValues(prev => {
      const updated = {
        ...prev,
        [name]: processedValue
      };
      
      // Save params for this method to localStorage
      localStorage.setItem(`telegram_params_${methodName}`, JSON.stringify(updated));
      
      return updated;
    });

    // Clear validation error if field is filled
    if (value && validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setParamValues(prev => {
      const updated = {
        ...prev,
        [name]: checked
      };
      
      // Save params for this method to localStorage
      localStorage.setItem(`telegram_params_${methodName}`, JSON.stringify(updated));
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!botToken) {
      onResponse({
        status: 400,
        error: "Bot token is required",
        timestamp: Date.now()
      });
      return;
    }

    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log(`Calling ${methodName} with params:`, paramValues);
      const response = await callTelegramApi(botToken, methodName, paramValues);
      console.log(`${methodName} response:`, response);
      onResponse(response);
    } catch (error) {
      console.error(`Error calling ${methodName}:`, error);
      onResponse({
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get the most common value for a parameter by comparing across saved method params
  const getSuggestedValue = (paramName: string): string => {
    const valuesCount: Record<string, number> = {};
    
    // Count occurrences of each value
    Object.values(lastUsedParams).forEach(params => {
      const value = params[paramName];
      if (value !== undefined && value !== '') {
        const valueStr = String(value);
        valuesCount[valueStr] = (valuesCount[valueStr] || 0) + 1;
      }
    });
    
    // Find the most common value
    let mostCommonValue = '';
    let highestCount = 0;
    
    Object.entries(valuesCount).forEach(([value, count]) => {
      if (count > highestCount) {
        mostCommonValue = value;
        highestCount = count;
      }
    });
    
    return mostCommonValue;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-primary">{method.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">{method.description}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Method Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" align="end" className="max-w-[300px]">
                <p className="text-sm">This method: <code className="bg-secondary/50 px-1 rounded text-xs">{methodName}</code></p>
                <p className="text-xs mt-1 text-gray-500">{method.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(validationErrors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fix the validation errors before submitting
              </AlertDescription>
            </Alert>
          )}
          
          {method.parameters.map((param) => {
            const suggestedValue = getSuggestedValue(param.name);
            
            return (
              <div key={param.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor={param.name} className="flex items-center">
                    {param.name}
                    {param.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  
                  {suggestedValue && param.name !== 'chat_id' && !paramValues[param.name] && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-primary"
                      onClick={() => handleInputChange(param.name, suggestedValue, param.type)}
                    >
                      Use common value
                    </Button>
                  )}
                </div>
                
                {param.type === "boolean" ? (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={param.name}
                      checked={!!paramValues[param.name]}
                      onCheckedChange={(checked) => handleSwitchChange(param.name, checked)}
                    />
                    <Label htmlFor={param.name}>
                      {paramValues[param.name] ? "True" : "False"}
                    </Label>
                  </div>
                ) : param.type === "string" && param.name.includes("text") ? (
                  <Textarea
                    id={param.name}
                    value={(paramValues[param.name] as string) || ""}
                    onChange={(e) => handleInputChange(param.name, e.target.value, param.type)}
                    placeholder={param.placeholder}
                    className={`h-24 ${validationErrors[param.name] ? "border-red-500" : ""}`}
                  />
                ) : param.name === "parse_mode" ? (
                  <Select 
                    value={(paramValues[param.name] as string) || ""} 
                    onValueChange={(value) => handleInputChange(param.name, value, "string")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parse mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="MarkdownV2">MarkdownV2</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="Markdown">Markdown (legacy)</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={param.name}
                    type={param.type === "number" ? "number" : "text"}
                    value={(paramValues[param.name] as string) || ""}
                    onChange={(e) => handleInputChange(param.name, e.target.value, param.type)}
                    placeholder={param.placeholder}
                    className={validationErrors[param.name] ? "border-red-500" : ""}
                  />
                )}
                
                {validationErrors[param.name] && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors[param.name]}</p>
                )}
                
                <p className="text-xs text-gray-500">{param.description}</p>
                
                {param.name === "chat_id" && (
                  <div className="flex gap-2 mt-1">
                    {Object.entries(lastUsedParams)
                      .filter(([method, params]) => params.chat_id && method !== methodName)
                      .slice(0, 3)
                      .map(([method, params]) => (
                        <Button
                          key={method}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => handleInputChange("chat_id", String(params.chat_id), "string")}
                        >
                          Use {String(params.chat_id).substring(0, 8)}
                        </Button>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="flex gap-3 mt-6">
            <Button
              type="submit"
              className="mt-4"
              disabled={isLoading || !botToken}
            >
              {isLoading ? "Sending..." : "Execute Request"}
            </Button>
            
            {Object.keys(paramValues).length > 0 && (
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setParamValues({});
                  localStorage.removeItem(`telegram_params_${methodName}`);
                }}
              >
                Clear Form
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiForm;
