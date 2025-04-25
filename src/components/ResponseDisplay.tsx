
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/services/telegramApi";
import { Copy, ChevronUp, ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ResponseDisplayProps {
  response: ApiResponse | null;
}

const ResponseDisplay = ({ response }: ResponseDisplayProps) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(true);

  if (!response) return null;

  const isSuccess = response.ok === true;
  const statusColor = isSuccess ? "text-green-500" : "text-red-500";
  const executionTime = `Executed in ${Date.now() - response.timestamp}ms`;

  // Function to format JSON with syntax highlighting
  const formatJSON = (json: any): string => {
    if (typeof json !== "object" || json === null) {
      return JSON.stringify(json);
    }
    return JSON.stringify(json, null, 2);
  };

  const formattedJson = formatJSON(response);

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(formattedJson);
    toast({
      title: "Copied to clipboard",
      description: "Response JSON has been copied",
    });
  };

  // Apply syntax highlighting to JSON
  const renderHighlightedJSON = (jsonString: string) => {
    // This is a simple version, you could use a library like react-json-view for more features
    return (
      <pre className="json-pretty text-sm overflow-x-auto">
        {jsonString
          .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
          .replace(/"([^"]+)"/g, '<span class="json-string">"$1"</span>')
          .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
          .replace(/\b(\d+)\b/g, '<span class="json-number">$1</span>')
          .replace(/\bnull\b/g, '<span class="json-null">null</span>')}
      </pre>
    );
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg flex items-center">
            Response
            <span className={`ml-2 text-sm font-normal ${statusColor}`}>
              ({response.status} {isSuccess ? "OK" : "Error"})
            </span>
          </CardTitle>
          <p className="text-xs text-muted-foreground">{executionTime}</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Hide
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> Show
              </>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2" 
            onClick={handleCopyResponse}
          >
            <Copy className="h-4 w-4 mr-1" /> Copy
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          <div 
            dangerouslySetInnerHTML={{ __html: renderHighlightedJSON(formattedJson) }} 
          />
        </CardContent>
      )}
    </Card>
  );
};

export default ResponseDisplay;
