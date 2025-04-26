import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { API_CATEGORIES, getMethodsByCategory } from "@/utils/apiMethods";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  MessageSquare, 
  Users, 
  Shield, 
  Layout, 
  Settings, 
  FileText,
  Radio,
  Webhook,
  Cog
} from "lucide-react";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Basic":
      return <Layout className="w-4 h-4" />;
    case "Messages":
      return <MessageSquare className="w-4 h-4" />;
    case "Members":
      return <Users className="w-4 h-4" />;
    case "Admin":
      return <Shield className="w-4 h-4" />;
    case "Chat Management":
      return <Settings className="w-4 h-4" />;
    case "Media":
      return <FileText className="w-4 h-4" />;
    case "Webhooks":
      return <Webhook className="w-4 h-4" />;
    case "Advanced":
      return <Cog className="w-4 h-4" />;
    default:
      return <Radio className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Basic":
      return "hover:bg-blue-100 dark:hover:bg-blue-900/20";
    case "Messages":
      return "hover:bg-green-100 dark:hover:bg-green-900/20";
    case "Members":
      return "hover:bg-purple-100 dark:hover:bg-purple-900/20";
    case "Admin":
      return "hover:bg-red-100 dark:hover:bg-red-900/20";
    case "Chat Management":
      return "hover:bg-orange-100 dark:hover:bg-orange-900/20";
    case "Media":
      return "hover:bg-pink-100 dark:hover:bg-pink-900/20";
    case "Webhooks":
      return "hover:bg-indigo-100 dark:hover:bg-indigo-900/20";
    case "Advanced":
      return "hover:bg-cyan-100 dark:hover:bg-cyan-900/20";
    default:
      return "hover:bg-gray-100 dark:hover:bg-gray-900/20";
  }
};

const getCategoryHeaderColor = (category: string) => {
  switch (category) {
    case "Basic":
      return "text-blue-600 dark:text-blue-400";
    case "Messages":
      return "text-green-600 dark:text-green-400";
    case "Members":
      return "text-purple-600 dark:text-purple-400";
    case "Admin":
      return "text-red-600 dark:text-red-400";
    case "Chat Management":
      return "text-orange-600 dark:text-orange-400";
    case "Media":
      return "text-pink-600 dark:text-pink-400";
    case "Webhooks":
      return "text-indigo-600 dark:text-indigo-400";
    case "Advanced":
      return "text-cyan-600 dark:text-cyan-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

interface SidebarProps {
  isOpen: boolean;
  selectedMethod: string | null;
  onSelectMethod: (methodName: string) => void;
}

const Sidebar = ({ isOpen, selectedMethod, onSelectMethod }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  useEffect(() => {
    if (API_CATEGORIES.includes("Basic")) {
      setExpandedCategories(["Basic"]);
    }
  }, []);

  return (
    <div 
      className={cn(
        "fixed lg:relative h-full bg-white dark:bg-gray-800 border-r w-64 shadow-lg transition-all duration-300 ease-in-out z-40 overflow-auto",
        "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="p-4 border-b bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <h2 className="font-semibold text-lg text-primary">Telegram API Methods</h2>
        <p className="text-xs text-gray-500 mt-1">Select a method to test</p>
      </div>

      <div className="py-2">
        <Accordion 
          type="multiple" 
          value={expandedCategories}
          onValueChange={setExpandedCategories}
        >
          {API_CATEGORIES.map((category) => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger 
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  "flex items-center gap-2",
                  getCategoryHeaderColor(category)
                )}
              >
                {getCategoryIcon(category)}
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-2">
                  {getMethodsByCategory(category).map((method) => (
                    <Button
                      key={method.name}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left text-sm py-1.5 h-auto",
                        "transition-all duration-200 ease-in-out",
                        getCategoryColor(category),
                        selectedMethod === method.name && [
                          "bg-primary/10 text-primary font-medium",
                          getCategoryHeaderColor(category)
                        ]
                      )}
                      onClick={() => onSelectMethod(method.name)}
                    >
                      {method.title}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
