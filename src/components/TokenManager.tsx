
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { testBotToken, validateBotToken } from "@/services/telegramApi";
import { CheckCircle, Trash2, Edit } from "lucide-react";

interface SavedToken {
  id: string;
  name: string;
  token: string;
}

interface TokenManagerProps {
  currentToken: string;
  onTokenChange: (token: string) => void;
}

const TokenManager = ({ currentToken, onTokenChange }: TokenManagerProps) => {
  const { toast } = useToast();
  const [tokens, setTokens] = useState<SavedToken[]>([]);
  const [newTokenName, setNewTokenName] = useState("");
  const [newToken, setNewToken] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isEditMode, setIsEditMode] = useState<string | null>(null);

  // Load saved tokens from localStorage
  useEffect(() => {
    const savedTokens = localStorage.getItem("telegram_bot_tokens");
    if (savedTokens) {
      try {
        setTokens(JSON.parse(savedTokens));
      } catch (error) {
        console.error("Error parsing saved tokens:", error);
      }
    }
  }, []);

  // Save tokens to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("telegram_bot_tokens", JSON.stringify(tokens));
  }, [tokens]);

  const handleSaveToken = async () => {
    if (!newToken.trim() || !newTokenName.trim()) {
      toast({
        title: "Error",
        description: "Both name and token are required",
        variant: "destructive",
      });
      return;
    }

    if (!validateBotToken(newToken)) {
      toast({
        title: "Invalid Token Format",
        description: "Please check your bot token format",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      const isValid = await testBotToken(newToken);
      
      if (!isValid) {
        toast({
          title: "Invalid Token",
          description: "Could not authenticate with this bot token",
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }

      if (isEditMode) {
        // Update existing token
        setTokens(tokens.map(t => 
          t.id === isEditMode ? { ...t, name: newTokenName, token: newToken } : t
        ));
        setIsEditMode(null);
      } else {
        // Add new token
        const newId = Date.now().toString();
        setTokens([...tokens, { id: newId, name: newTokenName, token: newToken }]);
      }
      
      onTokenChange(newToken);
      
      toast({
        title: "Success",
        description: "Bot token saved and verified successfully",
        variant: "default",
      });
      
      setNewToken("");
      setNewTokenName("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate token",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleDeleteToken = (id: string) => {
    setTokens(tokens.filter(t => t.id !== id));
    toast({
      title: "Token Deleted",
      description: "The bot token has been removed",
    });
  };

  const handleSelectToken = (token: string) => {
    onTokenChange(token);
    toast({
      title: "Token Selected",
      description: "You can now test APIs with this bot",
    });
  };

  const handleEditToken = (token: SavedToken) => {
    setIsEditMode(token.id);
    setNewTokenName(token.name);
    setNewToken(token.token);
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Bot Token</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add/Edit Token</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Bot Token" : "Add New Bot Token"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  placeholder="My Telegram Bot"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="token" className="text-right">
                  Token
                </Label>
                <Input
                  id="token"
                  value={newToken}
                  onChange={(e) => setNewToken(e.target.value)}
                  placeholder="123456789:ABCDEF1234ghIkl-zyx57W2v1u123ew11"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveToken} disabled={isValidating}>
                {isValidating ? "Validating..." : "Save Token"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current token display */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Current Token:
        </label>
        <Input 
          type="text"
          value={currentToken || "No token selected"}
          readOnly
          className="font-mono text-sm"
        />
      </div>

      {/* Saved tokens list */}
      {tokens.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Saved Tokens:</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {tokens.map((savedToken) => (
              <div 
                key={savedToken.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded border"
              >
                <span className="font-medium">{savedToken.name}</span>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleSelectToken(savedToken.token)}
                    className="h-8 w-8 text-green-600"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditToken(savedToken)}
                    className="h-8 w-8 text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteToken(savedToken.id)}
                    className="h-8 w-8 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenManager;
