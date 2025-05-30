import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FolderOpen,
  ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import CategoryForm from "@/components/CategoryForm";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";

const Categories = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories, isLoading, deleteCategory } = useCategories(
    user?.company_id
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description &&
        category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setShowEditDialog(true);
  };

  const handleCloseEdit = () => {
    setShowEditDialog(false);
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <>
        <div className="p-6 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
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
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-10 w-10 object-cover rounded-lg"
                            />
                          ) : (
                            <FolderOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description || "Sem descrição"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                          Subcategorias:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories &&
                          category.subcategories.length > 0 ? (
                            <>
                              {category.subcategories
                                .slice(0, 3)
                                .map((sub: any, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {sub.name}
                                  </Badge>
                                ))}
                              {category.subcategories.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{category.subcategories.length - 3}
                                </Badge>
                              )}
                            </>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Nenhuma subcategoria
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Badge className="bg-green-100 text-green-800">
                          Ativo
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteCategory(category.id)}
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

        {/* Edit Category Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>
                Edite as informações da categoria
              </DialogDescription>
            </DialogHeader>
            {selectedCategory && (
              <CategoryForm
                initialData={selectedCategory}
                onSuccess={handleCloseEdit}
                mode="edit"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Categories;
