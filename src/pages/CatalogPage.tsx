
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, ShoppingCart, Star, Filter, Grid, List, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCatalogData, type CatalogProduct } from '@/hooks/useCatalogData';
import { useCart } from '@/contexts/CartContext';
import { CartDrawer } from '@/components/CartDrawer';

const CatalogPage = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const { company, categories, products, isLoading, searchProducts } = useCatalogData(subdomain);
  const { addToCart, cartItems, isOpen, setIsOpen } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = searchProducts(products, searchTerm);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.promotional_price || a.price) - (b.promotional_price || b.price);
        case 'price-high':
          return (b.promotional_price || b.price) - (a.promotional_price || a.price);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, searchProducts]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCustomFields = (customFields: Record<string, string>) => {
    if (!customFields || Object.keys(customFields).length === 0) return null;

    return (
      <div className="space-y-1">
        {Object.entries(customFields).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-600">{key}:</span>
            <span className="font-medium">{String(value)}</span>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Catálogo não encontrado</h1>
          <p className="text-gray-600">O catálogo solicitado não existe ou não está disponível.</p>
        </div>
      </div>
    );
  }

  const primaryColor = company.primary_color || '#3B82F6';
  const secondaryColor = company.secondary_color || '#1E40AF';

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          :root {
            --primary-color: ${primaryColor};
            --secondary-color: ${secondaryColor};
          }
          .custom-primary { background-color: var(--primary-color); }
          .custom-primary-text { color: var(--primary-color); }
          .custom-secondary { background-color: var(--secondary-color); }
          .custom-border { border-color: var(--primary-color); }
        `}
      </style>

      {/* Header */}
      <header className="custom-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {company.logo_url && (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-10 w-auto"
                />
              )}
              <h1 className="text-xl font-bold">{company.name}</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 relative"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {getCartItemCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {getCartItemCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="rating">Avaliação</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Produtos ({filteredProducts.length})</TabsTrigger>
            <TabsTrigger value="categories">Categorias ({categories.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    )}
                    <p className="text-sm text-gray-500">{category.count} produtos</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum produto encontrado.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {product.image && (
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className={viewMode === 'grid' ? "w-full h-48 object-cover" : "w-32 h-32 object-cover"}
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 custom-primary">
                            {product.badge}
                          </Badge>
                        )}
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating?.toFixed(1) || '0.0'}</span>
                          <span className="text-gray-500">({product.reviews || 0})</span>
                        </div>
                      </div>

                      {product.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {renderCustomFields(product.custom_fields || {})}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                          {product.promotional_price && product.promotional_price < product.price ? (
                            <>
                              <span className="text-lg font-bold custom-primary-text">
                                {formatPrice(product.promotional_price)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold custom-primary-text">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        <div className="text-sm text-gray-500">
                          Estoque: {product.stock}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      <Button 
                        className="w-full custom-primary hover:custom-secondary"
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.promotional_price || product.price,
                          image: product.image,
                          stock: product.stock
                        })}
                        disabled={product.stock <= 0}
                      >
                        {product.stock <= 0 ? 'Fora de estoque' : 'Adicionar ao carrinho'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <CartDrawer />
    </div>
  );
};

export default CatalogPage;
