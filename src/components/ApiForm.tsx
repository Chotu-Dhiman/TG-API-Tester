
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMethodByName } from "@/utils/apiMethods";
import { ApiResponse, callTelegramApi } from "@/services/telegramApi";

interface ApiFormProps {
  methodName: string;
  botToken: string;
  onResponse: (response: ApiResponse) => void;
}

const ApiForm = ({ methodName, botToken, onResponse }: ApiFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string | number | boolean>>({});
  const method = getMethodByName(methodName);

  // Reset form when method changes
  useEffect(() => {
    setParamValues({});
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
    
    setIsLoading(true);
    
    try {
      const response = await callTelegramApi(botToken, methodName, paramValues);
      onResponse(response);
    } catch (error) {
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
              ) : param.type === "string" && param.name === "text" ? (
                <Textarea
                  id={param.name}
                  value={paramValues[param.name] as string || ""}
                  onChange={(e) => handleInputChange(param.name, e.target.value, param.type)}
                  placeholder={param.placeholder}
                  className="h-24"
                />
              ) : (
                <Input
                  id={param.name}
                  type={param.type === "number" ? "number" : "text"}
                  value={paramValues[param.name] as string || ""}
                  onChange={(e) => handleInputChange(param.name, e.target.value, param.type)}
                  placeholder={param.placeholder}
                  required={param.required}
                />
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
