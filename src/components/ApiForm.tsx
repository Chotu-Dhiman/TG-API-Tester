
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMethodByName } from "@/utils/apiMethods";
import { ApiResponse, callTelegramApi } from "@/services/telegramApi";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiFormProps {
  methodName: string;
  botToken: string;
  onResponse: (response: ApiResponse) => void;
}

const ApiForm = ({ methodName, botToken, onResponse }: ApiFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string | number | boolean>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const method = getMethodByName(methodName);

  // Reset form when method changes
  useEffect(() => {
    setParamValues({});
    setValidationErrors({});
  }, [methodName]);

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
    
    setParamValues(prev => ({
      ...prev,
      [name]: processedValue
    }));

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
    setParamValues(prev => ({
      ...prev,
      [name]: checked
    }));
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-primary">{method.title}</CardTitle>
        <p className="text-sm text-gray-500">{method.description}</p>
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
          
          {method.parameters.map((param) => (
            <div key={param.name} className="space-y-1">
              <Label htmlFor={param.name} className="flex items-center">
                {param.name}
                {param.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              
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
            </div>
          ))}
          
          <Button
            type="submit"
            className="mt-4"
            disabled={isLoading || !botToken}
          >
            {isLoading ? "Sending..." : "Execute Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiForm;
