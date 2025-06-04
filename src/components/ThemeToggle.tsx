
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLocation } from "react-router-dom";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Verificar se está em uma rota privada/admin
  const isPrivateRoute = location.pathname.startsWith('/admin') || 
                         location.pathname.startsWith('/profile') ||
                         location.pathname.startsWith('/orders') ||
                         location.pathname.startsWith('/products') ||
                         location.pathname.startsWith('/categories') ||
                         location.pathname.startsWith('/reports') ||
                         location.pathname.startsWith('/subscribers') ||
                         location.pathname.startsWith('/appearance') ||
                         location.pathname.startsWith('/catalog-config') ||
                         location.pathname.startsWith('/system-config');

  // Só renderizar o toggle em rotas privadas
  if (!isPrivateRoute) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Aplicar tema apenas se estivermos em uma rota admin
    if (isPrivateRoute) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
    }
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
