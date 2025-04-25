
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { API_CATEGORIES, getMethodsByCategory } from "@/utils/apiMethods";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SidebarProps {
  isOpen: boolean;
  selectedMethod: string | null;
  onSelectMethod: (methodName: string) => void;
}

const Sidebar = ({ isOpen, selectedMethod, onSelectMethod }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // Initialize with Basic category expanded
  useEffect(() => {
    if (API_CATEGORIES.includes("Basic")) {
      setExpandedCategories(["Basic"]);
    }
  }, []);

  const handleCategoryToggle = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div 
      className={cn(
        "fixed lg:relative h-full bg-white dark:bg-gray-800 border-r w-64 shadow-lg transition-all duration-300 ease-in-out z-40 overflow-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">API Methods</h2>
        <p className="text-xs text-gray-500 mt-1">Select a method to test</p>
      </div>

      <div className="py-2">
        <Accordion type="multiple" value={expandedCategories}>
          {API_CATEGORIES.map((category) => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
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
                        selectedMethod === method.name && "bg-primary/10 text-primary font-medium"
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
