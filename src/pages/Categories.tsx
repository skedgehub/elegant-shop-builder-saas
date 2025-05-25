
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Tag,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: 1,
      name: "Eletrônicos",
      description: "Dispositivos eletrônicos e tecnologia",
      productCount: 45,
      color: "#3b82f6",
      subcategories: [
        { id: 11, name: "Smartphones", productCount: 15 },
        { id: 12, name: "Notebooks", productCount: 12 },
        { id: 13, name: "Tablets", productCount: 8 },
        { id: 14, name: "Acessórios", productCount: 10 }
      ]
    },
    {
      id: 2,
      name: "Roupas",
      description: "Vestuário masculino e feminino",
      productCount: 32,
      color: "#ec4899",
      subcategories: [
        { id: 21, name: "Camisas", productCount: 12 },
        { id: 22, name: "Calças", productCount: 10 },
        { id: 23, name: "Vestidos", productCount: 6 },
        { id: 24, name: "Casacos", productCount: 4 }
      ]
    },
    {
      id: 3,
      name: "Calçados",
      description: "Sapatos, tênis e sandálias",
      productCount: 28,
      color: "#f59e0b",
      subcategories: [
        { id: 31, name: "Tênis Esportivos", productCount: 15 },
        { id: 32, name: "Sapatos Sociais", productCount: 8 },
        { id: 33, name: "Sandálias", productCount: 5 }
      ]
    },
    {
      id: 4,
      name: "Casa & Decoração",
      description: "Itens para casa e decoração",
      productCount: 22,
      color: "#10b981",
      subcategories: [
        { id: 41, name: "Móveis", productCount: 10 },
        { id: 42, name: "Decoração", productCount: 8 },
        { id: 43, name: "Iluminação", productCount: 4 }
      ]
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
            <p className="text-gray-600">Organize seus produtos em categorias e subcategorias</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Nova Subcategoria
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar categorias..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories List */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">
                      {category.productCount} produtos
                    </Badge>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Subcategories */}
              <CardContent className="pt-0">
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Subcategorias</h4>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.subcategories.map((subcategory) => (
                      <div 
                        key={subcategory.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{subcategory.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {subcategory.productCount}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma categoria encontrada</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "Tente alterar os termos de busca" : "Comece criando sua primeira categoria"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Categoria
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-sm text-gray-600">Total de Categorias</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {categories.reduce((acc, cat) => acc + cat.subcategories.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total de Subcategorias</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {categories.reduce((acc, cat) => acc + cat.productCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total de Produtos</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;
