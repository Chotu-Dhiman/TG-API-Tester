
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
    setSelectedMethod(methodName);
    setApiResponse(null);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleResponse = (response: ApiResponse) => {
    setApiResponse(response);
    // Scroll to response
    setTimeout(() => {
      const element = document.getElementById('response-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          selectedMethod={selectedMethod}
          onSelectMethod={handleMethodSelect}
        />
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <TokenManager 
            currentToken={botToken}
            onTokenChange={setBotToken}
          />
          
          <div className="mb-6">
            <ApiForm 
              methodName={selectedMethod} 
              botToken={botToken}
              onResponse={handleResponse}
            />
          </div>
          
          <div id="response-section">
            <ResponseDisplay response={apiResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
