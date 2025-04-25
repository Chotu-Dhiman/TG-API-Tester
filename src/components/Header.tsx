
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-primary text-white py-4 px-6 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-white mr-2 hover:bg-primary/50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="flex items-center">
          <img 
            src="/placeholder.svg" 
            alt="Telegram Bot API Tester" 
            className="w-8 h-8 mr-3" 
          />
          <h1 className="text-xl font-bold">Telegram Bot API Tester</h1>
        </div>
      </div>
      <div>
        <a 
          href="https://core.telegram.org/bots/api" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm underline hover:text-blue-200 transition-colors"
        >
          Official API Docs
        </a>
      </div>
    </header>
  );
};

export default Header;
