
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
  Bell,
  BarChart3,
  FileText,
  CreditCard
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Visão Geral",
        href: "/admin",
        icon: LayoutDashboard
      },
      {
        title: "Relatórios",
        href: "/admin/reports",
        icon: BarChart3
      }
    ]
  },
  {
    title: "Catálogo",
    items: [
      {
        title: "Produtos",
        href: "/admin/products",
        icon: Package
      },
      {
        title: "Categorias",
        href: "/admin/categories",
        icon: FolderOpen
      }
    ]
  },
  {
    title: "Vendas",
    items: [
      {
        title: "Pedidos",
        href: "/admin/orders",
        icon: ShoppingCart
      },
      {
        title: "Clientes",
        href: "/admin/subscribers",
        icon: Users
      }
    ]
  },
  {
    title: "Configurações",
    items: [
      {
        title: "Catálogo Online",
        href: "/admin/catalog-config",
        icon: Globe
      },
      {
        title: "Sistema",
        href: "/admin/system-config",
        icon: Settings
      },
      {
        title: "Aparência",
        href: "/admin/appearance",
        icon: Palette
      }
    ]
  }
];

interface AdminSidebarProps {
  className?: string;
}

const AdminSidebar = ({ className }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn("pb-12 border-r bg-white dark:bg-gray-900", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            Admin Panel
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-100px)] px-1">
          <div className="space-y-6 p-2">
            {sidebarItems.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Button
                      key={item.href}
                      variant={location.pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdminSidebar;
