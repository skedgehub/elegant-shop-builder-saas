
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  ChevronDown,
  Plus,
  Edit,
} from "lucide-react";
import { useState } from "react";

interface SidebarSubItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SidebarItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  subitems?: SidebarSubItem[];
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarItems: SidebarSection[] = [
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
        icon: Package,
        subitems: [
          {
            title: "Todos os Produtos",
            href: "/admin/products",
          },
          {
            title: "Novo Produto",
            href: "/admin/products/new",
            icon: Plus,
          },
        ],
      },
      {
        title: "Categorias",
        icon: FolderOpen,
        subitems: [
          {
            title: "Todas as Categorias",
            href: "/admin/categories",
          },
          {
            title: "Nova Categoria",
            href: "/admin/categories/new",
            icon: Plus,
          },
        ],
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle]
    }));
  };

  const isActiveRoute = (href: string) => location.pathname === href;
  
  const isParentActive = (item: SidebarItem) => {
    if (item.href && isActiveRoute(item.href)) return true;
    if (item.subitems) {
      return item.subitems.some(subitem => isActiveRoute(subitem.href));
    }
    return false;
  };

  return (
    <div
      className={cn(
        "relative pb-12 border-r transition-all duration-300 ease-in-out flex-shrink-0",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2">
          <div
            className={cn(
              "flex items-center justify-between min-h-[40px]",
              isCollapsed,
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
                size="icon"
                onClick={onToggleCollapse}
                className="p-0 visible"
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
                  {section.items.map((item) => {
                    const hasSubitems = item.subitems && item.subitems.length > 0;
                    const isExpanded = expandedItems[item.title];
                    const isActive = isParentActive(item);

                    return (
                      <div key={item.title}>
                        {hasSubitems ? (
                          <Collapsible
                            open={isExpanded}
                            onOpenChange={() => toggleExpanded(item.title)}
                          >
                            <CollapsibleTrigger asChild>
                              <Button
                                variant={isActive ? "secondary" : "ghost"}
                                size={isCollapsed ? "icon" : "default"}
                                className={cn(
                                  "w-full justify-start hover:bg-primary/25 dark:hover:bg-primary/25",
                                  isCollapsed ? "px-2" : "px-4",
                                  isActive &&
                                    "bg-primary dark:bg-primary dark:text-black",
                                )}
                                title={isCollapsed ? item.title : undefined}
                              >
                                <div className={cn(
                                  "flex items-center",
                                  isCollapsed && "justify-center",
                                )}>
                                  <item.icon className="h-4 w-4 flex-shrink-0" />
                                  {!isCollapsed && (
                                    <>
                                      <span className="ml-2 truncate">{item.title}</span>
                                      <ChevronDown className={cn(
                                        "ml-auto h-4 w-4 transition-transform",
                                        isExpanded && "rotate-180"
                                      )} />
                                    </>
                                  )}
                                </div>
                              </Button>
                            </CollapsibleTrigger>
                            {!isCollapsed && (
                              <CollapsibleContent className="space-y-1">
                                <div className="ml-6 space-y-1">
                                  {item.subitems?.map((subitem) => (
                                    <Button
                                      key={subitem.href}
                                      variant={
                                        isActiveRoute(subitem.href) ? "secondary" : "ghost"
                                      }
                                      size="sm"
                                      className={cn(
                                        "w-full justify-start hover:bg-primary/25 dark:hover:bg-primary/25",
                                        "px-3 py-2 text-sm",
                                        isActiveRoute(subitem.href) &&
                                          "bg-primary dark:bg-primary dark:text-black",
                                      )}
                                      asChild
                                    >
                                      <Link
                                        to={subitem.href}
                                        className="flex items-center"
                                      >
                                        {subitem.icon && (
                                          <subitem.icon className="h-3 w-3 flex-shrink-0" />
                                        )}
                                        <span className={cn("truncate", subitem.icon && "ml-2")}>
                                          {subitem.title}
                                        </span>
                                      </Link>
                                    </Button>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            )}
                          </Collapsible>
                        ) : (
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            size={isCollapsed ? "icon" : "default"}
                            className={cn(
                              "w-full justify-start hover:bg-primary/25 dark:hover:bg-primary/25",
                              isCollapsed ? "px-2" : "px-4",
                              isActive &&
                                "bg-primary dark:bg-primary dark:text-black",
                            )}
                            asChild
                            title={isCollapsed ? item.title : undefined}
                          >
                            <Link
                              to={item.href!}
                              className={cn(
                                "flex items-center",
                                isCollapsed && "justify-center",
                              )}
                            >
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              {!isCollapsed && (
                                <span className="ml-2 truncate">{item.title}</span>
                              )}
                            </Link>
                          </Button>
                        )}
                      </div>
                    );
                  })}
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
