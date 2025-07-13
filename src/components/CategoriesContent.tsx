import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Folder,
  ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";

const CategoriesContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories, isLoading, deleteCategory } = useCategories(
    user?.company_id,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description &&
        category.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Categorias
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie as categorias e subcategorias dos seus produtos
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
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
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
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Subcategorias</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <Collapsible key={category.id} asChild>
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategory(category.id);
                              }}
                            >
                              {expandedCategories.has(category.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                {category.image ? (
                                  <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-10 w-10 object-cover rounded-lg"
                                  />
                                ) : (
                                  <ImageIcon className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {category.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {category.description || "Sem descrição"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {Array.isArray(category.subcategories)
                                ? category.subcategories.length
                                : 0}{" "}
                              subcategorias
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    `/admin/categories/edit/${category.id}`,
                                  );
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteCategory(category.id);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <TableRow>
                          <TableCell colSpan={5} className="p-0">
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 border-l-4 border-blue-500">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                                Subcategorias:
                              </h4>
                              {Array.isArray(category.subcategories) &&
                              category.subcategories.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {category.subcategories.map(
                                    (sub: any, index: number) => (
                                      <Badge
                                        key={index}
                                        variant="secondary"
                                        className="justify-start"
                                      >
                                        {typeof sub === "string"
                                          ? sub
                                          : sub.name}
                                      </Badge>
                                    ),
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Nenhuma subcategoria cadastrada
                                </p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesContent;
