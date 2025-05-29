
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CartDrawer from "@/components/CartDrawer";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus,
  Star,
  Filter,
  Grid3X3,
  List,
  Eye,
  MessageCircle
} from "lucide-react";
import { catalogService } from "@/services/catalogService";
import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import { toast } from "@/hooks/use-toast";

const CatalogPage = () => {
  const { subdomain } = useParams();
  const { items, addToCart, getTotalItems } = useCart();
  
  const [company, setCompany] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (subdomain) {
      loadCatalogData();
    }
  }, [subdomain]);

  const loadCatalogData = async () => {
    try {
      setIsLoading(true);
      
      // Buscar empresa pelo subdomínio
      const companyData = await catalogService.getCompanyBySubdomain(subdomain!);
      if (!companyData) {
        toast({
          title: "Erro",
          description: "Catálogo não encontrado",
          variant: "destructive",
        });
        return;
      }
      
      setCompany(companyData);
      
      // Buscar produtos e categorias da empresa
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(companyData.id),
        categoryService.getCategories(companyData.id)
      ]);
      
      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading catalog:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar catálogo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Catálogo não encontrado</h1>
          <p className="text-gray-600">O catálogo solicitado não existe ou não está disponível.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {company.name.charAt(0)}
                  </span>
                </div>
              )}
              <h1 className="ml-3 text-xl font-bold text-gray-900">{company.name}</h1>
            </div>

            {/* Cart Button */}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative"
              style={{ backgroundColor: company.primary_color || '#3B82F6' }}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou termos de busca.
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sem imagem</span>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg truncate flex-1 mr-2">
                      {product.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProduct(product)}
                      className="flex-shrink-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {product.promotionalPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">
                            R$ {product.promotionalPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            R$ {product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          R$ {product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {product.stock <= 5 && product.stock > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Últimas {product.stock} unidades
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full"
                    style={{ backgroundColor: company.primary_color || '#3B82F6' }}
                  >
                    {product.stock === 0 ? (
                      "Esgotado"
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar ao Carrinho
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        companyId={company?.id}
      />

      {/* Product Details Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden rounded-lg">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {selectedProduct.description && (
                  <p className="text-gray-600">{selectedProduct.description}</p>
                )}
                
                <div className="flex items-center gap-2">
                  {selectedProduct.promotionalPrice ? (
                    <>
                      <span className="text-2xl font-bold text-green-600">
                        R$ {selectedProduct.promotionalPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        R$ {selectedProduct.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {selectedProduct.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {selectedProduct.stock <= 5 && selectedProduct.stock > 0 && (
                  <Badge variant="secondary">
                    Últimas {selectedProduct.stock} unidades
                  </Badge>
                )}
                
                <Button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  disabled={selectedProduct.stock === 0}
                  className="w-full"
                  style={{ backgroundColor: company.primary_color || '#3B82F6' }}
                >
                  {selectedProduct.stock === 0 ? (
                    "Esgotado"
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CatalogPage;
