
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
  Globe,
  Tag,
  Package
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products } = useProducts(user?.company_id);
  const { orders } = useOrders(user?.company_id);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

  const stats = [
    {
      title: "Total de Produtos",
      value: totalProducts.toString(),
      change: "+12%",
      changeType: "positive",
      icon: ShoppingBag
    },
    {
      title: "Pedidos Totais",
      value: totalOrders.toString(),
      change: `${pendingOrders} pendentes`,
      changeType: "neutral", 
      icon: Package
    },
    {
      title: "Receita Total",
      value: `R$ ${totalRevenue.toFixed(2)}`,
      change: "+15%",
      changeType: "positive",
      icon: TrendingUp
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "+0.5%",
      changeType: "positive",
      icon: BarChart3
    }
  ];

  const recentProducts = products.slice(0, 5).map(product => ({
    id: product.id,
    name: product.name,
    category: "Categoria",
    price: `R$ ${product.price.toFixed(2)}`,
    status: "Ativo",
    views: Math.floor(Math.random() * 300)
  }));

  const topCategories = [
    { name: "Eletrônicos", products: products.filter(p => p.category_id).length, percentage: 35 },
    { name: "Roupas", products: Math.floor(products.length * 0.25), percentage: 25 },
    { name: "Calçados", products: Math.floor(products.length * 0.22), percentage: 22 },
    { name: "Acessórios", products: Math.floor(products.length * 0.18), percentage: 18 }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Visão geral da sua loja
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/catalog/minhaloja")}
            >
              <Globe className="h-4 w-4 mr-2" />
              Ver Catálogo
            </Button>
            <Button size="sm" onClick={() => navigate("/admin/products/new")}>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/admin/products")}
                  >
                    Ver Todos
                  </Button>
                </CardTitle>
                <CardDescription>
                  Produtos adicionados recentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nenhum produto encontrado</p>
                    </div>
                  ) : (
                    recentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {product.category}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {product.price}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {product.views} views
                            </p>
                          </div>
                          <Badge
                            variant={
                              product.status === "Ativo" ? "default" : "secondary"
                            }
                          >
                            {product.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Categories */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Categorias</CardTitle>
                <CardDescription>Categorias com mais produtos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {category.products} produtos
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 dark:bg-primary-400 h-2 rounded-full transition-all duration-300"
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
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/products/new")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/categories/new")}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/orders")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Ver Pedidos
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
