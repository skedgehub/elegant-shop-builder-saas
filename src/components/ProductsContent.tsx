
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Package,
  ImageIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductsContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, isLoading, deleteProduct } = useProducts(user?.company_id);
  const { categories } = useCategories(user?.company_id);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const isMobile = useIsMobile();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || "Sem categoria";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setShowEditDialog(true);
  };

  const handleCloseEdit = () => {
    setShowEditDialog(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48"></div>
          <div className="h-24 sm:h-32 bg-gray-200 rounded"></div>
          <div className="h-24 sm:h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Mobile Card View
  const MobileProductCard = ({ product }: { product: any }) => (
    <Card className="mb-4">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start space-x-3">
          <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg"
              />
            ) : (
              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
              {product.name}
            </div>
            {product.description && (
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                {product.description}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {getCategoryName(product.category_id)}
              </Badge>
              <Badge
                variant={product.stock > 0 ? "default" : "destructive"}
                className="text-xs"
              >
                {product.stock} un.
              </Badge>
            </div>
            <div className="mt-2">
              {product.promotional_price ? (
                <div className="space-y-1">
                  <div className="font-medium text-green-600 text-sm">
                    {formatPrice(product.promotional_price)}
                  </div>
                  <div className="text-xs text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </div>
                </div>
              ) : (
                <div className="font-medium text-sm">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(product)}
                className="h-8 px-2"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteProduct(product.id)}
                className="text-red-600 hover:text-red-700 h-8 px-2"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Produtos
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">
            Gerencie o catálogo de produtos da sua loja
          </p>
        </div>
        <Button onClick={() => navigate("/admin/products/new")} className="w-full sm:w-auto text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0 sm:p-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Tente alterar os termos de busca ou criar um novo produto
              </p>
              <Button onClick={() => navigate("/admin/products/new")} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </div>
          ) : (
            <>
              {/* Mobile View */}
              {isMobile ? (
                <div className="p-4 space-y-4">
                  {filteredProducts.map((product) => (
                    <MobileProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* Desktop Table View - Now Responsive */
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Produto</TableHead>
                        <TableHead className="min-w-[120px]">Categoria</TableHead>
                        <TableHead className="min-w-[100px]">Preço</TableHead>
                        <TableHead className="min-w-[80px]">Estoque</TableHead>
                        <TableHead className="min-w-[80px]">Status</TableHead>
                        <TableHead className="min-w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-lg"
                                  />
                                ) : (
                                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[150px]">
                                  {product.name}
                                </div>
                                {product.description && (
                                  <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 max-w-[150px]">
                                    {product.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {getCategoryName(product.category_id)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              {product.promotional_price ? (
                                <>
                                  <div className="font-medium text-green-600 text-sm">
                                    {formatPrice(product.promotional_price)}
                                  </div>
                                  <div className="text-xs text-gray-500 line-through">
                                    {formatPrice(product.price)}
                                  </div>
                                </>
                              ) : (
                                <div className="font-medium text-sm">
                                  {formatPrice(product.price)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={product.stock > 0 ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {product.stock}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={product.stock > 0 ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {product.stock > 0 ? "Ativo" : "Sem estoque"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(product)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Product Dialog - Now Responsive */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Editar Produto</DialogTitle>
            <DialogDescription className="text-sm">
              Edite as informações do produto
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm 
              initialData={selectedProduct}
              onSuccess={handleCloseEdit}
              mode="edit"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsContent;
