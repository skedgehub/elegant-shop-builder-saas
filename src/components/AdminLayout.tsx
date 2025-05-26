
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tag, 
  Palette, 
  Settings, 
  Menu,
  X,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  User,
  Plus
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Produtos", href: "/admin/products", icon: ShoppingBag },
    { name: "Categorias", href: "/admin/categories", icon: Tag },
    { name: "Config. Catálogo", href: "/admin/catalog-config", icon: Palette },
    { name: "Config. Sistema", href: "/admin/system-config", icon: Settings },
  ];

  const handleViewCatalog = () => {
    navigate("/catalog/minhaloja");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-card shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div className={`flex items-center space-x-2 transition-all duration-300 ${sidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">CatalogoPro</span>
          </div>
          
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Desktop collapse button */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="mt-4 px-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group
                      ${isActive 
                        ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }
                      ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''}
                    `}
                    onClick={() => setSidebarOpen(false)}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className={`ml-3 transition-all duration-300 ${sidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Actions */}
          <div className="mt-8 border-t border-border pt-4">
            <div className={`text-xs font-semibold text-muted-foreground px-3 mb-2 transition-all duration-300 ${sidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
              Ações Rápidas
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/admin/products/new"
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    text-muted-foreground hover:bg-accent hover:text-accent-foreground
                    ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''}
                  `}
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? "Novo Produto" : undefined}
                >
                  <Plus className="h-4 w-4 flex-shrink-0" />
                  <span className={`ml-3 transition-all duration-300 ${sidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
                    Novo Produto
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories/new"
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    text-muted-foreground hover:bg-accent hover:text-accent-foreground
                    ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''}
                  `}
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? "Nova Categoria" : undefined}
                >
                  <Tag className="h-4 w-4 flex-shrink-0" />
                  <span className={`ml-3 transition-all duration-300 ${sidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
                    Nova Categoria
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full ${sidebarCollapsed ? 'lg:px-2' : 'justify-start'}`}
            onClick={handleViewCatalog}
            title={sidebarCollapsed ? "Ver Catálogo" : undefined}
          >
            <Globe className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-2'}`} />
            <span className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
              Ver Catálogo
            </span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 ${sidebarCollapsed ? 'lg:px-2' : 'justify-start'}`}
            title={sidebarCollapsed ? "Sair" : undefined}
          >
            <LogOut className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-2'}`} />
            <span className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
              Sair
            </span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Loja: <span className="font-medium text-foreground">minhaloja.catalogo.com.br</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                title="Alternar tema"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2">
                    <h4 className="font-medium mb-2">Notificações</h4>
                    <div className="space-y-2">
                      <div className="p-2 border rounded text-sm">
                        <p className="font-medium">Novo pedido recebido</p>
                        <p className="text-muted-foreground">Pedido #1234 - R$ 299,00</p>
                      </div>
                      <div className="p-2 border rounded text-sm">
                        <p className="font-medium">Produto em baixo estoque</p>
                        <p className="text-muted-foreground">Smartphone Galaxy S24 - 2 unidades</p>
                      </div>
                      <div className="p-2 border rounded text-sm">
                        <p className="font-medium">Nova avaliação</p>
                        <p className="text-muted-foreground">5 estrelas para Tênis Nike</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    Meu Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/admin/system-config")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
