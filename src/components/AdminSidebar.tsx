import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Settings,
  Globe,
  Palette,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Visão Geral",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Relatórios",
        href: "/admin/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Catálogo",
    items: [
      {
        title: "Produtos",
        href: "/admin/products",
        icon: Package,
      },
      {
        title: "Categorias",
        href: "/admin/categories",
        icon: FolderOpen,
      },
    ],
  },
  {
    title: "Vendas",
    items: [
      {
        title: "Pedidos",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        title: "Clientes",
        href: "/admin/subscribers",
        icon: Users,
      },
    ],
  },
  {
    title: "Configurações",
    items: [
      {
        title: "Catálogo Online",
        href: "/admin/catalog-config",
        icon: Globe,
      },
      {
        title: "Sistema",
        href: "/admin/system",
        icon: Settings,
      },
      {
        title: "Aparência",
        href: "/admin/appearance",
        icon: Palette,
      },
    ],
  },
];

interface AdminSidebarProps {
  className?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const AdminSidebar = ({
  className,
  isCollapsed,
  onToggleCollapse,
}: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "relative pb-12 border-r bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out flex-shrink-0",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2">
          <div
            className={cn(
              "flex items-center justify-between min-h-[40px]",
              isCollapsed
            )}
          >
            {!isCollapsed && (
              <h2 className="px-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                Marketing Link
              </h2>
            )}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 visible"
                title={isCollapsed ? "Expandir sidebar" : "Minimizar sidebar"}
                aria-label={
                  isCollapsed ? "Expandir sidebar" : "Minimizar sidebar"
                }
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)] px-1">
          <div className="space-y-6 p-2">
            {sidebarItems.map((section) => (
              <div key={section.title}>
                {!isCollapsed && (
                  <h3 className="mb-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Button
                      key={item.href}
                      variant={
                        location.pathname === item.href ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start hover:bg-primary dark:hover:bg-primary dark:hover:text-black",
                        isCollapsed ? "px-2" : "px-4",
                        location.pathname === item.href &&
                          "bg-primary dark:bg-primary  dark:text-black"
                      )}
                      asChild
                      title={isCollapsed ? item.title : undefined}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center",
                          isCollapsed && "justify-center"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="ml-2 truncate">{item.title}</span>
                        )}
                      </Link>
                    </Button>
                  ))}
                </div>
                {!isCollapsed && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdminSidebar;
