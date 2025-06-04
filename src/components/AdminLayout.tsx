
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import NotificationDropdown from "./NotificationDropdown";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const handleSignOut = async () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Mobile Sidebar */}
        {isMobile ? (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <AdminSidebar
                isCollapsed={false}
                onToggleCollapse={() => {}}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        ) : (
          /* Desktop Sidebar */
          <div className={cn(
            "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300",
            isCollapsed ? "lg:w-16" : "lg:w-64"
          )}>
            <AdminSidebar
              isCollapsed={isCollapsed}
              onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />
          </div>
        )}

        {/* Main content */}
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          !isMobile && (isCollapsed ? "lg:pl-16" : "lg:pl-64")
        )}>
          {/* Header - Fixed */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                {isMobile && (
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </Sheet>
                )}
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Painel Administrativo
                </h1>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:block">
                  <NotificationDropdown />
                </div>
                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
                      <span className="hidden sm:inline">{user?.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/profile")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page content - Scrollable */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
