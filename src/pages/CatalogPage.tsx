
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailsModal from "@/components/ProductDetailsModal";
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
  Plus
} from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const { addToCart, getTotalItems } = useCart();

  const categories = [
    { 
      id: "all", 
      name: "Todos os Produtos", 
      count: 127,
      subcategories: []
    },
    { 
      id: "electronics", 
      name: "Eletrônicos", 
      count: 45,
      subcategories: ["Smartphones", "Notebooks", "Fones", "Tablets"]
    },
    { 
      id: "clothing", 
      name: "Roupas", 
      count: 32,
      subcategories: ["Camisetas", "Calças", "Vestidos", "Jaquetas"]
    },
    { 
      id: "shoes", 
      name: "Calçados", 
      count: 28,
      subcategories: ["Tênis", "Sapatos", "Sandálias", "Botas"]
    },
    { 
      id: "home", 
      name: "Casa & Decoração", 
      count: 22,
      subcategories: ["Móveis", "Decoração", "Utensílios", "Iluminação"]
    }
  ];

  const products = [
    {
      id: 1,
      name: "Smartphone Galaxy S24 Ultra",
      category: "electronics",
      subcategory: "Smartphones",
      price: 1299.00,
      promotionalPrice: 1099.00,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 234,
      badge: "Oferta",
      description: "Smartphone premium com câmera profissional de alta qualidade, tela Dynamic AMOLED 6.8 polegadas e processador Snapdragon 8 Gen 3.",
      customFields: {
        marca: "Samsung",
        cor: "Preto Titânio",
        memoria: "256GB",
        tela: "6.8 polegadas"
      }
    },
    {
      id: 2,
      name: "Tênis Nike Air Max 270",
      category: "shoes",
      subcategory: "Tênis",
      price: 599.00,
      promotionalPrice: null,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 189,
      badge: null,
      description: "Tênis esportivo com máximo conforto e design moderno",
      customFields: {
        marca: "Nike",
        cor: "Branco/Preto",
        tamanho: "39-44",
        tipo: "Corrida"
      }
    },
    {
      id: 3,
      name: "Notebook Gamer Dell G15",
      category: "electronics",
      subcategory: "Notebooks",
      price: 2199.00,
      promotionalPrice: 1999.00,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
      badge: "Novo",
      description: "Notebook gamer com placa de vídeo dedicada",
      customFields: {
        marca: "Dell",
        processador: "Intel i7",
        memoria: "16GB RAM",
        armazenamento: "512GB SSD"
      }
    },
    {
      id: 4,
      name: "Camisa Polo Ralph Lauren",
      category: "clothing",
      subcategory: "Camisetas",
      price: 189.00,
      promotionalPrice: 149.00,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 143,
      badge: "Promoção",
      description: "Polo clássica 100% algodão",
      customFields: {
        marca: "Ralph Lauren",
        material: "100% Algodão",
        tamanho: "P, M, G, GG",
        cor: "Azul Marinho"
      }
    },
    {
      id: 5,
      name: "Fone Bluetooth Sony WH-1000XM5",
      category: "electronics",
      subcategory: "Fones",
      price: 399.00,
      promotionalPrice: null,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 298,
      badge: "Bestseller",
      description: "Fone com cancelamento de ruído ativo",
      customFields: {
        marca: "Sony",
        conexao: "Bluetooth 5.2",
        bateria: "30h",
        cancelamento: "Ruído Ativo"
      }
    },
    {
      id: 6,
      name: "Vestido Floral Zara",
      category: "clothing",
      subcategory: "Vestidos",
      price: 129.00,
      promotionalPrice: 99.00,
      image: "/placeholder.svg",
      rating: 4.4,
      reviews: 87,
      badge: "Liquidação",
      description: "Vestido estampado ideal para o verão",
      customFields: {
        marca: "Zara",
        material: "Viscose",
        tamanho: "P, M, G",
        estampa: "Floral"
      }
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === "all" || product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const openProductDetails = (product: any) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
      onClick={() => openProductDetails(product)}
    >
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Imagem do Produto</span>
        </div>
        
        {product.badge && (
          <Badge 
            className={`absolute top-2 left-2 z-10 ${
              product.badge === "Oferta" || product.badge === "Promoção" || product.badge === "Liquidação" 
                ? "bg-red-500" 
                : product.badge === "Novo" 
                ? "bg-green-500" 
                : "bg-blue-500"
            }`}
          >
            {product.badge}
          </Badge>
        )}
        
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button 
            size="sm" 
            variant="secondary" 
            className="h-8 w-8 p-0 shadow-md"
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
            className="h-8 w-8 p-0 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="space-y-2">
          {product.promotionalPrice ? (
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-green-600">
                R$ {product.promotionalPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              R$ {product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1 text-xs">
          {Object.entries(product.customFields).slice(0, 2).map(([key, value]) => (
            <div key={key} className="truncate">
              <span className="text-gray-500 capitalize">{key}:</span>
              <span className="ml-1 font-medium">{value}</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full mt-4"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }: { product: typeof products[0] }) => (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => openProductDetails(product)}
    >
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-xs text-gray-500">IMG</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
              </div>
              {product.badge && (
                <Badge 
                  className={`ml-2 ${
                    product.badge === "Oferta" || product.badge === "Promoção" || product.badge === "Liquidação" 
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

            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {product.promotionalPrice ? (
                  <div className="flex items-center space-x-2">
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

            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(product.customFields).slice(0, 4).map(([key, value]) => (
                <div key={key} className="truncate">
                  <span className="text-gray-500 capitalize">{key}:</span>
                  <span className="ml-1 font-medium">{value}</span>
                </div>
              ))}
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
                <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div>
                  <h1 className="font-bold text-gray-900">Minha Loja</h1>
                  <p className="text-xs text-gray-600 hidden sm:block">Produtos selecionados com qualidade</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Cart Button */}
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
                  <span>contato@minhaloja.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
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
          <aside className="hidden lg:block w-64">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-6 sticky top-24">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedSubcategory("all");
                      }}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between
                        ${selectedCategory === category.id 
                          ? 'bg-primary-100 text-primary-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategorias */}
              {selectedCategoryData && selectedCategoryData.subcategories.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Subcategorias</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedSubcategory("all")}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition-colors text-sm
                        ${selectedSubcategory === "all" 
                          ? 'bg-primary-100 text-primary-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      Todas
                    </button>
                    {selectedCategoryData.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg transition-colors text-sm
                          ${selectedSubcategory === sub 
                            ? 'bg-primary-100 text-primary-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100'
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
                <h3 className="font-semibold text-gray-900 mb-3">Faixa de Preço</h3>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input placeholder="Min" className="text-sm" />
                    <Input placeholder="Max" className="text-sm" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Aplicar</Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Filters and View Toggle */}
            <div className="flex items-center justify-between">
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
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <select className="text-sm border rounded-md px-3 py-1 bg-white">
                  <option>Mais Relevantes</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                  <option>Mais Avaliados</option>
                </select>
                
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-4">
                  Tente alterar os filtros ou termos de busca
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedSubcategory("all");
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
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold">Minha Loja</span>
              </div>
              <p className="text-gray-600 mb-4">
                Produtos selecionados com qualidade e preços justos. 
                Sua satisfação é nossa prioridade.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Rua das Flores, 123 - Centro - São Paulo/SP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@minhaloja.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Eletrônicos</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Roupas</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Calçados</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Casa & Decoração</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Entrega</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Minha Loja. Todos os direitos reservados. Powered by CatalogoPro.</p>
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
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedSubcategory("all");
                    }}
                    className={`
                      w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center justify-between
                      ${selectedCategory === category.id 
                        ? 'bg-primary-100 text-primary-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Subcategorias */}
            {selectedCategoryData && selectedCategoryData.subcategories.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Subcategorias</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSubcategory("all")}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg transition-colors text-sm
                      ${selectedSubcategory === "all" 
                        ? 'bg-primary-100 text-primary-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    Todas
                  </button>
                  {selectedCategoryData.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition-colors text-sm
                        ${selectedSubcategory === sub 
                          ? 'bg-primary-100 text-primary-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
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
              <h3 className="font-semibold text-gray-900 mb-3">Faixa de Preço</h3>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input placeholder="Min" className="text-sm" />
                  <Input placeholder="Max" className="text-sm" />
                </div>
                <Button variant="outline" size="sm" className="w-full">Aplicar</Button>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={() => setSidebarOpen(false)}
                className="w-full"
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default CatalogPage;
