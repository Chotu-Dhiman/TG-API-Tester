
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TokenManager from "@/components/TokenManager";
import ApiForm from "@/components/ApiForm";
import ResponseDisplay from "@/components/ResponseDisplay";
import { ApiResponse } from "@/services/telegramApi";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Menu } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("getMe");
  const [botToken, setBotToken] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [recentMethods, setRecentMethods] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("method");
  
  const isMobile = useIsMobile();

  // Load saved token and recent methods from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("telegram_bot_token");
    if (savedToken) {
      setBotToken(savedToken);
    }
    
    const savedRecentMethods = localStorage.getItem("recent_methods");
    if (savedRecentMethods) {
      try {
        const parsedMethods = JSON.parse(savedRecentMethods);
        if (Array.isArray(parsedMethods)) {
          setRecentMethods(parsedMethods);
        }
      } catch (e) {
        console.error("Failed to parse recent methods:", e);
      }
    }
  }, []);

  const handleMethodSelect = (methodName: string) => {
    console.log("Method selected:", methodName);
    setSelectedMethod(methodName);
    setApiResponse(null);
    
    // Add to recent methods
    setRecentMethods(prev => {
      const updated = [methodName, ...prev.filter(m => m !== methodName)].slice(0, 10);
      localStorage.setItem("recent_methods", JSON.stringify(updated));
      return updated;
    });
    
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleResponse = (response: ApiResponse) => {
    setApiResponse(response);
    setActiveTab("response");
    setTimeout(() => {
      const element = document.getElementById('response-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          selectedMethod={selectedMethod}
          onSelectMethod={handleMethodSelect}
        />
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <div className="max-w-4xl mx-auto w-full space-y-6">
            {/* Mobile sidebar toggle */}
            {isMobile && (
              <div className="flex items-center mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-4 h-4" />
                  Browse Methods
                </Button>
                
                {recentMethods.length > 0 && (
                  <div className="ml-4 text-sm text-gray-500">
                    Recent: 
                    {recentMethods.slice(0, 3).map((method, idx) => (
                      <Button 
                        key={method} 
                        variant="link" 
                        size="sm" 
                        className="text-primary"
                        onClick={() => handleMethodSelect(method)}
                      >
                        {method}
                        {idx < Math.min(recentMethods.length, 3) - 1 ? ',' : ''}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <TokenManager 
              currentToken={botToken}
              onTokenChange={setBotToken}
            />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-2">
                <TabsList>
                  <TabsTrigger value="method">Method</TabsTrigger>
                  <TabsTrigger value="response" disabled={!apiResponse}>Response</TabsTrigger>
                </TabsList>
                
                {activeTab === "response" && apiResponse && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveTab("method")}
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Form
                  </Button>
                )}
              </div>
              
              <TabsContent value="method" className="mt-0">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <ApiForm 
                    methodName={selectedMethod} 
                    botToken={botToken}
                    onResponse={handleResponse}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="response" className="mt-0">
                <div id="response-section">
                  <ResponseDisplay response={apiResponse} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
