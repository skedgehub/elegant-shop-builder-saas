
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
        "relative pb-12 border-r bg-sidebar transition-all duration-300 ease-in-out flex-shrink-0",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2">
          <div
            className={cn(
              "flex items-center justify-between min-h-[40px]",
              isCollapsed && "justify-center",
            )}
          >
            {!isCollapsed && (
              <h2 className="px-4 text-lg font-semibold tracking-tight text-sidebar-foreground truncate">
                Marketing Link
              </h2>
            )}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className={cn(
                  "h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && "mx-auto"
                )}
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
                  <h3 className="mb-3 px-4 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const hasSubitems = item.subitems && item.subitems.length > 0;
                    const isExpanded = expandedItems[item.title];
                    const isActive = isParentActive(item);
                    const hasActiveSubitem = hasSubitems && item.subitems!.some(subitem => isActiveRoute(subitem.href));

                    return (
                      <div key={item.title}>
                        {hasSubitems ? (
                          <Collapsible
                            open={isExpanded}
                            onOpenChange={() => toggleExpanded(item.title)}
                          >
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size={isCollapsed ? "icon" : "default"}
                                className={cn(
                                  "w-full text-sidebar-foreground transition-colors",
                                  isCollapsed 
                                    ? "h-10 w-10 p-0 mx-auto flex items-center justify-center" 
                                    : "justify-start px-3 h-9",
                                  // Estados de hover e active mais suaves
                                  "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                                  hasActiveSubitem && "bg-sidebar-accent/30 text-sidebar-accent-foreground font-medium",
                                )}
                                title={isCollapsed ? item.title : undefined}
                              >
                                <div className={cn(
                                  "flex items-center",
                                  isCollapsed ? "justify-center" : "justify-start w-full",
                                )}>
                                  <item.icon className="h-4 w-4 flex-shrink-0" />
                                  {!isCollapsed && (
                                    <>
                                      <span className="ml-3 truncate text-sm">{item.title}</span>
                                      <ChevronDown className={cn(
                                        "ml-auto h-3 w-3 transition-transform duration-200",
                                        isExpanded && "rotate-180"
                                      )} />
                                    </>
                                  )}
                                </div>
                              </Button>
                            </CollapsibleTrigger>
                            {!isCollapsed && (
                              <CollapsibleContent className="space-y-1">
                                <div className="ml-7 space-y-1 mt-1">
                                  {item.subitems?.map((subitem) => (
                                    <Button
                                      key={subitem.href}
                                      variant="ghost"
                                      size="sm"
                                      className={cn(
                                        "w-full justify-start px-3 py-2 h-8 text-xs text-sidebar-foreground/80",
                                        "hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground",
                                        "transition-colors duration-150",
                                        isActiveRoute(subitem.href) &&
                                          "bg-primary/90 text-primary-foreground font-medium shadow-sm",
                                      )}
                                      asChild
                                    >
                                      <Link
                                        to={subitem.href}
                                        className="flex items-center"
                                      >
                                        {subitem.icon && (
                                          <subitem.icon className="h-3 w-3 flex-shrink-0 mr-2" />
                                        )}
                                        <span className="truncate">
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
                            variant="ghost"
                            size={isCollapsed ? "icon" : "default"}
                            className={cn(
                              "w-full text-sidebar-foreground transition-colors",
                              isCollapsed 
                                ? "h-10 w-10 p-0 mx-auto flex items-center justify-center" 
                                : "justify-start px-3 h-9",
                              "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                              isActive &&
                                "bg-primary/90 text-primary-foreground font-medium shadow-sm",
                            )}
                            asChild
                            title={isCollapsed ? item.title : undefined}
                          >
                            <Link
                              to={item.href!}
                              className={cn(
                                "flex items-center",
                                isCollapsed ? "justify-center" : "justify-start",
                              )}
                            >
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              {!isCollapsed && (
                                <span className="ml-3 truncate text-sm">{item.title}</span>
                              )}
                            </Link>
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                {!isCollapsed && section !== sidebarItems[sidebarItems.length - 1] && (
                  <Separator className="my-4 bg-sidebar-border" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdminSidebar;
