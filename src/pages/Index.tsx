
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TokenManager from "@/components/TokenManager";
import ApiForm from "@/components/ApiForm";
import ResponseDisplay from "@/components/ResponseDisplay";
import { ApiResponse } from "@/services/telegramApi";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("getMe");
  const [botToken, setBotToken] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  
  const isMobile = useIsMobile();

  const handleMethodSelect = (methodName: string) => {
    console.log("Method selected:", methodName);
    setSelectedMethod(methodName);
    setApiResponse(null);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleResponse = (response: ApiResponse) => {
    setApiResponse(response);
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
            <TokenManager 
              currentToken={botToken}
              onTokenChange={setBotToken}
            />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <ApiForm 
                methodName={selectedMethod} 
                botToken={botToken}
                onResponse={handleResponse}
              />
            </div>
            
            <div id="response-section" className="mb-8">
              <ResponseDisplay response={apiResponse} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
