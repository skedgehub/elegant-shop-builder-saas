import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import NotificationDropdown from "./NotificationDropdown";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <AdminSidebar
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          />
        </div>

        {/* Main content */}
        <div className={cn("flex-1", isCollapsed ? "lg:pl-16" : "lg:pl-64")}>
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Painel Administrativo
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <NotificationDropdown />
                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-5 w-5 mr-2" />
                      {user?.email}
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

          {/* Page content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
