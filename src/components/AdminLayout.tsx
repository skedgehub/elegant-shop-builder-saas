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
    <div className="min-h-screen">
      <div className="flex h-screen">
        {/* Mobile Sidebar */}
        {isMobile ? (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <AdminSidebar isCollapsed={false} onToggleCollapse={() => {}} />
            </SheetContent>
          </Sheet>
        ) : (
          /* Desktop Sidebar */
          <div
            className={cn(
              "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300",
              isCollapsed ? "lg:w-16" : "lg:w-64",
            )}
          >
            <AdminSidebar
              isCollapsed={isCollapsed}
              onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />
          </div>
        )}

        {/* Main content */}
        <div
          className={cn(
            "flex-1 flex flex-col transition-all duration-300",
            !isMobile && (isCollapsed ? "lg:pl-16" : "lg:pl-64"),
          )}
        >
          {/* Header - Fixed and Responsive */}
          <header className="shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
            <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                {/* Mobile Menu Button */}
                {isMobile && (
                  <Sheet
                    open={isMobileMenuOpen}
                    onOpenChange={setIsMobileMenuOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </SheetTrigger>
                  </Sheet>
                )}
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">
                    Painel Administrativo
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
                <div className="hidden sm:block">
                  <NotificationDropdown />
                </div>
                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs sm:text-sm max-w-[120px] sm:max-w-none"
                    >
                      <User className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline truncate">
                        {user?.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="text-sm">
                      Minha Conta
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/profile")}
                      className="text-sm"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-sm"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page content - Scrollable and Responsive */}
          <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 bg-gray-50 dark:bg-background">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
