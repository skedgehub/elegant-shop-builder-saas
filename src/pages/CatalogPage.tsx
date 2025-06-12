import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import CheckoutForm from "@/components/CheckoutForm";
import { useCatalogData, CatalogProduct } from "@/hooks/useCatalogData";
import { useOrders } from "@/hooks/useOrders";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  ShoppingCart,
  Heart,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Plus,
  ChevronDown,
  SlidersHorizontal,
  Package,
  Store,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Home,
  Zap,
  Shield,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CatalogPage = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const {
    company,
    categories,
    products,
    isLoading,
    searchProducts,
    error,
    catalogData,
  } = useCatalogData(subdomain);
  const { createOrder } = useOrders();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(
    null
  );
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { addToCart, items, clearCart } = useCart();

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Transform categories for the filter
  const categoryFilters = [
    {
      id: "all",
      name: "Todos os Produtos",
      count: products.length,
      subcategories: [],
    },
    ...categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: products.filter((p) => p.category_id === cat.id).length,
      subcategories: cat.subcategories || [],
    })),
  ];

  const selectedCategoryData = categoryFilters.find(
    (cat) => cat.id === selectedCategory
  );

  // Get subcategories for selected category
  const availableSubcategories = selectedCategoryData?.subcategories || [];

  // Filter and search products
  let filteredProducts: CatalogProduct[] = [...products];

  // Apply search
  if (searchTerm) {
    filteredProducts = searchProducts(filteredProducts, searchTerm);
  }

  // Apply category filter
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category_id === selectedCategory
    );
  }

  // Apply subcategory filter
  if (selectedSubcategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.subcategory === selectedSubcategory
    );
  }

  // Apply price range filter
  if (priceRange.min || priceRange.max) {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.promotional_price || product.price;
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      return price >= min && price <= max;
    });
  }

  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (
          (a.promotional_price || a.price) - (b.promotional_price || b.price)
        );
      case "price-desc":
        return (
          (b.promotional_price || b.price) - (a.promotional_price || a.price)
        );
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const openProductDetails = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleCheckout = async (orderData: any) => {
    try {
      const orderItems = items.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.promotionalPrice || item.price,
        total: (item.promotionalPrice || item.price) * item.quantity,
      }));

      const createOrderData = {
        customer_name: orderData.name,
        customer_email: orderData.email,
        customer_phone: orderData.phone,
        customer_address: orderData.address,
        items: orderItems,
        total_amount: getTotalPrice(),
        notes: orderData.notes || "",
      };

      createOrder(createOrderData);

      // Clear cart and close checkout
      clearCart();
      setCheckoutOpen(false);
      setCartOpen(false);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Erro ao processar pedido. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  if (error || !catalogData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Catálogo não encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            Não foi possível encontrar este catálogo. Verifique o endereço ou
            entre em contato conosco.
          </p>
          <Button asChild>
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    );
  }

  const ProductCard = ({ product }: { product: CatalogProduct }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = product.image ? [product.image] : [];

    const nextImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    };

    return (
      <Card
        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer bg-white h-full flex flex-col"
        onClick={() => openProductDetails(product)}
      >
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {images.length > 1 && (
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 shadow-md bg-white/90 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 shadow-md bg-white/90 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}

          {product.badge && (
            <Badge
              className={`absolute top-2 left-2 z-10 ${
                product.badge === "Oferta" ||
                product.badge === "Promoção" ||
                product.badge === "Liquidação"
                  ? "bg-red-500"
                  : product.badge === "Novo"
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              {product.badge}
            </Badge>
          )}

          <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 shadow-md bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 shadow-md bg-white/90 hover:bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors text-sm leading-tight">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                {product.rating?.toFixed(1)} ({product.reviews || 0})
              </span>
            </div>
          )}

          <div className="space-y-3">
            <div className="space-y-1">
              {product.promotional_price ? (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-green-600">
                    R$ {product.promotional_price.toFixed(2)}
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

            <Button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProductListItem = ({ product }: { product: CatalogProduct }) => (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={() => openProductDetails(product)}
    >
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 line-clamp-1 text-sm">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {product.description}
                  </p>
                )}
              </div>
              {product.badge && (
                <Badge
                  className={`ml-2 flex-shrink-0 ${
                    product.badge === "Oferta" ||
                    product.badge === "Promoção" ||
                    product.badge === "Liquidação"
                      ? "bg-red-500"
                      : product.badge === "Novo"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  {product.badge}
                </Badge>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {product.rating?.toFixed(1)} ({product.reviews || 0})
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {product.promotional_price ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">
                      R$ {product.promotional_price.toFixed(2)}
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

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrinho
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-2">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {company.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="hidden sm:block">
                  <h1 className="font-bold text-gray-900">{company.name}</h1>
                  <p className="text-xs text-gray-600">
                    Produtos selecionados com qualidade
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>contato@{company.subdomain}.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 h-12 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-6 sticky top-24">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categoryFilters.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedSubcategory("all");
                      }}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between
                        ${
                          selectedCategory === category.id
                            ? "bg-primary-100 text-primary-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      <span className="truncate">{category.name}</span>
                      <Badge
                        variant="secondary"
                        className="text-xs ml-2 flex-shrink-0"
                      >
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {availableSubcategories.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Subcategorias
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedSubcategory("all")}
                      className={`
                      w-full text-left px-3 py-2 rounded-lg transition-colors text-sm
                      ${
                        selectedSubcategory === "all"
                          ? "bg-primary-100 text-primary-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                    >
                      Todas
                    </button>
                    {availableSubcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`
                        w-full text-left px-3 py-2 rounded-lg transition-colors text-sm truncate
                        ${
                          selectedSubcategory === sub
                            ? "bg-primary-100 text-primary-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Faixa de Preço
                </h3>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Min"
                      className="text-sm"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      type="number"
                    />
                    <Input
                      placeholder="Max"
                      className="text-sm"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      type="number"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setPriceRange({ min: "", max: "" })}
                  >
                    Limpar
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  {filteredProducts.length} produtos encontrados
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Mais Relevantes</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                    <SelectItem value="rating">Mais Avaliados</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente alterar os filtros ou termos de busca
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedSubcategory("all");
                    setPriceRange({ min: "", max: "" });
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {company.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-xl font-bold">{company.name}</span>
              </div>
              <p className="text-gray-600 mb-4">
                Produtos selecionados com qualidade e preços justos. Sua
                satisfação é nossa prioridade.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Rua das Flores, 123 - Centro - São Paulo/SP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>contato@{company.subdomain}.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedSubcategory("all");
                      }}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 transition-colors"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 transition-colors"
                  >
                    Trocas e Devoluções
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 transition-colors"
                  >
                    Entrega
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 transition-colors"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>
              &copy; 2024 {company.name}. Todos os direitos reservados. Powered
              by Wibbo.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Filters Drawer */}
      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle>Filtros</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="p-4 space-y-6 overflow-y-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Categorias</h3>
              <div className="space-y-2">
                {categoryFilters.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedSubcategory("all");
                    }}
                    className={`
                      w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center justify-between
                      ${
                        selectedCategory === category.id
                          ? "bg-primary-100 text-primary-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <span className="truncate">{category.name}</span>
                    <Badge
                      variant="secondary"
                      className="text-xs ml-2 flex-shrink-0"
                    >
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {availableSubcategories.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Subcategorias
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSubcategory("all")}
                    className={`
                    w-full text-left px-3 py-2 rounded-lg transition-colors text-sm
                    ${
                      selectedSubcategory === "all"
                        ? "bg-primary-100 text-primary-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                  >
                    Todas
                  </button>
                  {availableSubcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`
                      w-full text-left px-3 py-2 rounded-lg transition-colors text-sm truncate
                      ${
                        selectedSubcategory === sub
                          ? "bg-primary-100 text-primary-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Faixa de Preço
              </h3>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Min"
                    className="text-sm"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    type="number"
                  />
                  <Input
                    placeholder="Max"
                    className="text-sm"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    type="number"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setPriceRange({ min: "", max: "" })}
                >
                  Limpar
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={() => setSidebarOpen(false)} className="w-full">
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={addToCart}
      />

      {/* Checkout Drawer */}
      <Drawer open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle>Finalizar Pedido</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="p-4 overflow-y-auto">
            <CheckoutForm
              onSubmit={handleCheckout}
              onBack={() => setCheckoutOpen(false)}
              totalPrice={getTotalPrice()}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CatalogPage;
