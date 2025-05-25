
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Eye,
  Plus,
  BarChart3,
  Activity,
  Globe
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total de Produtos",
      value: "127",
      change: "+12%",
      changeType: "positive",
      icon: ShoppingBag
    },
    {
      title: "Visualizações",
      value: "2.847",
      change: "+23%",
      changeType: "positive", 
      icon: Eye
    },
    {
      title: "Categorias",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: BarChart3
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "+0.5%",
      changeType: "positive",
      icon: TrendingUp
    }
  ];

  const recentProducts = [
    { id: 1, name: "Smartphone Galaxy", category: "Eletrônicos", price: "R$ 1.299,00", status: "Ativo", views: 234 },
    { id: 2, name: "Tênis Nike Air", category: "Calçados", price: "R$ 599,00", status: "Ativo", views: 189 },
    { id: 3, name: "Notebook Dell", category: "Eletrônicos", price: "R$ 2.199,00", status: "Rascunho", views: 156 },
    { id: 4, name: "Camisa Polo", category: "Roupas", price: "R$ 89,00", status: "Ativo", views: 143 },
    { id: 5, name: "Fone Bluetooth", category: "Eletrônicos", price: "R$ 199,00", status: "Ativo", views: 98 }
  ];

  const topCategories = [
    { name: "Eletrônicos", products: 45, percentage: 35 },
    { name: "Roupas", products: 32, percentage: 25 },
    { name: "Calçados", products: 28, percentage: 22 },
    { name: "Acessórios", products: 22, percentage: 18 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Visão geral da sua loja</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Ver Catálogo
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} desde o mês passado
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Products */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Produtos Recentes
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </CardTitle>
                <CardDescription>
                  Produtos adicionados recentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{product.price}</p>
                          <p className="text-sm text-gray-600">{product.views} views</p>
                        </div>
                        <Badge variant={product.status === 'Ativo' ? 'default' : 'secondary'}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Categories */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Categorias</CardTitle>
                <CardDescription>
                  Categorias com mais produtos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        <span className="text-sm text-gray-600">{category.products} produtos</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Tag className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Ver Relatórios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
