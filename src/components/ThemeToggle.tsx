
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLocation } from "react-router-dom";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Only show theme toggle in admin/private areas
  const isPrivateArea = location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith('/profile');

  if (!isPrivateArea) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
