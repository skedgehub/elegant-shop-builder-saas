
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  Settings, 
  Eye, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Produtos",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Categorias",
    url: "/admin/categories",
    icon: FolderOpen,
  },
  {
    title: "Perfil",
    url: "/admin/profile",
    icon: User,
  },
  {
    title: "Configurações",
    url: "/admin/system-config",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">Admin Panel</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Painel de controle</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="group">
                      <Link
                        to={item.url}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                          }
                        `}
                      >
                        <item.icon className={`
                          w-5 h-5 flex-shrink-0 transition-colors duration-200
                          ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'}
                        `} />
                        {state === "expanded" && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Ações Rápidas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-200"
                  >
                    <Eye className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
                    {state === "expanded" && (
                      <span className="font-medium">Ver Catálogo</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
