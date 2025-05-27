
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  FolderOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";

const Categories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const categories = [
    {
      id: 1,
      name: "Eletrônicos",
      description: "Produtos eletrônicos e gadgets",
      productCount: 45,
      subcategories: ["Smartphones", "Notebooks", "Fones", "Tablets"],
      status: "active"
    },
    {
      id: 2,
      name: "Roupas",
      description: "Vestuário masculino e feminino",
      productCount: 32,
      subcategories: ["Camisetas", "Calças", "Vestidos", "Jaquetas"],
      status: "active"
    },
    {
      id: 3,
      name: "Calçados",
      description: "Sapatos, tênis e sandálias",
      productCount: 28,
      subcategories: ["Tênis", "Sapatos", "Sandálias", "Botas"],
      status: "active"
    },
    {
      id: 4,
      name: "Casa & Decoração",
      description: "Itens para casa e decoração",
      productCount: 22,
      subcategories: ["Móveis", "Decoração", "Utensílios", "Iluminação"],
      status: "active"
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Categorias
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize seus produtos em categorias
            </p>
          </div>
          <Button onClick={() => navigate("/admin/categories/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                          <FolderOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Produtos
                        </span>
                        <Badge variant="secondary">
                          {category.productCount}
                        </Badge>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                          Subcategorias:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories
                            .slice(0, 3)
                            .map((sub, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {sub}
                              </Badge>
                            ))}
                          {category.subcategories.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.subcategories.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Badge className="bg-green-100 text-green-800">
                          Ativo
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Nenhuma categoria encontrada
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Tente alterar os termos de busca ou criar uma nova categoria
                </p>
                <Button onClick={() => navigate("/admin/categories/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Categories;
