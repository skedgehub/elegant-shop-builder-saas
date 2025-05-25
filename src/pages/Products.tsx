
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  MoreHorizontal
} from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: "Smartphone Galaxy S24",
      category: "Eletrônicos",
      subcategory: "Smartphones",
      price: 1299.00,
      promotionalPrice: 1099.00,
      status: "Ativo",
      views: 234,
      stock: 45,
      image: "/placeholder.svg",
      customFields: {
        marca: "Samsung",
        cor: "Preto",
        memoria: "128GB"
      }
    },
    {
      id: 2,
      name: "Tênis Nike Air Max",
      category: "Calçados",
      subcategory: "Tênis Esportivos",
      price: 599.00,
      promotionalPrice: null,
      status: "Ativo",
      views: 189,
      stock: 23,
      image: "/placeholder.svg",
      customFields: {
        marca: "Nike",
        tamanho: "42",
        cor: "Branco"
      }
    },
    {
      id: 3,
      name: "Notebook Dell Inspiron",
      category: "Eletrônicos",
      subcategory: "Notebooks",
      price: 2199.00,
      promotionalPrice: 1999.00,
      status: "Rascunho",
      views: 156,
      stock: 12,
      image: "/placeholder.svg",
      customFields: {
        marca: "Dell",
        processador: "Intel i5",
        memoria: "8GB RAM"
      }
    },
    {
      id: 4,
      name: "Camisa Polo Ralph Lauren",
      category: "Roupas",
      subcategory: "Camisas",
      price: 189.00,
      promotionalPrice: 149.00,
      status: "Ativo",
      views: 143,
      stock: 67,
      image: "/placeholder.svg",
      customFields: {
        marca: "Ralph Lauren",
        tamanho: "M",
        material: "Algodão"
      }
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
            <p className="text-gray-600">Gerencie seus produtos e estoque</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Buscar produtos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square bg-gray-100 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Imagem do Produto</span>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant={product.status === 'Ativo' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category} • {product.subcategory}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      {product.promotionalPrice ? (
                        <>
                          <span className="text-lg font-bold text-green-600">
                            R$ {product.promotionalPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            R$ {product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          R$ {product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Estoque:</span>
                      <span className="ml-1 font-medium">{product.stock}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Views:</span>
                      <span className="ml-1 font-medium">{product.views}</span>
                    </div>
                  </div>

                  {/* Custom Fields Preview */}
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-2">Campos Personalizados:</p>
                    <div className="space-y-1">
                      {Object.entries(product.customFields).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "Tente alterar os filtros de busca" : "Comece adicionando seu primeiro produto"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;
