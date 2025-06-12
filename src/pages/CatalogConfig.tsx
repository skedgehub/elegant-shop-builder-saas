import AdminLayout from "@/components/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Palette,
  Layout,
  Globe,
  Save,
  Eye,
  Upload,
  Type,
  Image,
  Smartphone,
} from "lucide-react";

const CatalogConfig = () => {
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Configuração do Catálogo
            </h1>
            <p className="text-gray-600">
              Personalize a aparência e funcionamento do seu catálogo
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <Tabs defaultValue="design" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="design" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center space-x-2">
              <Layout className="h-4 w-4" />
              <span className="hidden sm:inline">Layout</span>
            </TabsTrigger>
            <TabsTrigger value="domain" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Domínio</span>
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center space-x-2"
            >
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">Conteúdo</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
          </TabsList>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cores do Tema</CardTitle>
                  <CardDescription>
                    Defina as cores principais do seu catálogo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Cor Primária</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="primary-color"
                          defaultValue="#2563eb"
                          className="w-12 h-10 rounded border"
                        />
                        <Input value="#2563eb" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Cor Secundária</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="secondary-color"
                          defaultValue="#64748b"
                          className="w-12 h-10 rounded border"
                        />
                        <Input value="#64748b" className="flex-1" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="accent-color">Cor de Destaque</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="accent-color"
                          defaultValue="#f59e0b"
                          className="w-12 h-10 rounded border"
                        />
                        <Input value="#f59e0b" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="text-color">Cor do Texto</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="text-color"
                          defaultValue="#1f2937"
                          className="w-12 h-10 rounded border"
                        />
                        <Input value="#1f2937" className="flex-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logotipo e Identidade</CardTitle>
                  <CardDescription>
                    Configure a identidade visual da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="logo">Logotipo Principal</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Clique para fazer upload ou arraste sua logo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG até 2MB
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="favicon">Favicon</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <Image className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">
                        Upload favicon (32x32px)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tipografia</CardTitle>
                <CardDescription>
                  Escolha as fontes para seu catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heading-font">Fonte dos Títulos</Label>
                    <select className="w-full mt-2 p-2 border rounded-md">
                      <option>Inter (Recomendado)</option>
                      <option>Outfit</option>
                      <option>Roboto</option>
                      <option>Open Sans</option>
                      <option>Lato</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="body-font">Fonte do Corpo</Label>
                    <select className="w-full mt-2 p-2 border rounded-md">
                      <option>Inter (Recomendado)</option>
                      <option>Outfit</option>
                      <option>Roboto</option>
                      <option>Open Sans</option>
                      <option>Lato</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estrutura da Página</CardTitle>
                  <CardDescription>
                    Configure o layout geral do catálogo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-header">Mostrar Cabeçalho</Label>
                      <p className="text-sm text-gray-600">
                        Exibir logo e navegação no topo
                      </p>
                    </div>
                    <Switch id="show-header" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-banner">
                        Mostrar Banner Principal
                      </Label>
                      <p className="text-sm text-gray-600">
                        Banner promocional na página inicial
                      </p>
                    </div>
                    <Switch id="show-banner" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-categories">
                        Mostrar Menu de Categorias
                      </Label>
                      <p className="text-sm text-gray-600">
                        Menu lateral com categorias
                      </p>
                    </div>
                    <Switch id="show-categories" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-search">Mostrar Busca</Label>
                      <p className="text-sm text-gray-600">
                        Barra de pesquisa de produtos
                      </p>
                    </div>
                    <Switch id="show-search" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grade de Produtos</CardTitle>
                  <CardDescription>
                    Como os produtos são exibidos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Produtos por Linha (Desktop)</Label>
                    <select className="w-full mt-2 p-2 border rounded-md">
                      <option value="3">3 produtos</option>
                      <option value="4" selected>
                        4 produtos
                      </option>
                      <option value="5">5 produtos</option>
                      <option value="6">6 produtos</option>
                    </select>
                  </div>

                  <div>
                    <Label>Produtos por Linha (Mobile)</Label>
                    <select className="w-full mt-2 p-2 border rounded-md">
                      <option value="1">1 produto</option>
                      <option value="2" selected>
                        2 produtos
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-prices">Mostrar Preços</Label>
                      <p className="text-sm text-gray-600">
                        Exibir preços nos produtos
                      </p>
                    </div>
                    <Switch id="show-prices" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-promo">Destacar Promoções</Label>
                      <p className="text-sm text-gray-600">
                        Mostrar selo de promoção
                      </p>
                    </div>
                    <Switch id="show-promo" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Domain Tab */}
          <TabsContent value="domain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Subdomínio</CardTitle>
                <CardDescription>
                  Configure seu subdomínio personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subdomain">Subdomínio</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      id="subdomain"
                      placeholder="minhaloja"
                      className="flex-1"
                    />
                    <span className="text-gray-600">.wibbo.com.br</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Seu catálogo ficará disponível em: minhaloja.wibbo.com.br
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Status do Domínio
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">
                      Ativo e funcionando
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">
                    Domínio Personalizado (Premium)
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Input placeholder="www.minhaloja.com.br" disabled />
                    <Button variant="outline" disabled>
                      Configurar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Disponível nos planos Professional e Enterprise
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Textos da Loja</CardTitle>
                  <CardDescription>
                    Personalize os textos do seu catálogo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="store-name">Nome da Loja</Label>
                    <Input
                      id="store-name"
                      defaultValue="Minha Loja"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="store-description">Descrição da Loja</Label>
                    <Textarea
                      id="store-description"
                      placeholder="Descreva sua loja em poucas palavras..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="welcome-message">
                      Mensagem de Boas-vindas
                    </Label>
                    <Textarea
                      id="welcome-message"
                      placeholder="Bem-vindos à nossa loja!"
                      className="mt-2"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>
                    Dados para contato com clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@minhaloja.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Textarea
                      id="address"
                      placeholder="Rua das Flores, 123 - Centro - São Paulo/SP"
                      className="mt-2"
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-contact">
                        Mostrar Informações de Contato
                      </Label>
                      <p className="text-sm text-gray-600">
                        Exibir contato no rodapé
                      </p>
                    </div>
                    <Switch id="show-contact" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mobile Tab */}
          <TabsContent value="mobile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Mobile</CardTitle>
                <CardDescription>
                  Otimize a experiência mobile do seu catálogo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mobile-optimized">Otimização Mobile</Label>
                    <p className="text-sm text-gray-600">
                      Layout responsivo automático
                    </p>
                  </div>
                  <Switch id="mobile-optimized" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="touch-friendly">
                      Botões Touch-Friendly
                    </Label>
                    <p className="text-sm text-gray-600">
                      Botões maiores para mobile
                    </p>
                  </div>
                  <Switch id="touch-friendly" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mobile-menu">Menu Mobile Compacto</Label>
                    <p className="text-sm text-gray-600">
                      Menu hamburger em telas pequenas
                    </p>
                  </div>
                  <Switch id="mobile-menu" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="swipe-gallery">Galeria com Swipe</Label>
                    <p className="text-sm text-gray-600">
                      Deslizar entre imagens dos produtos
                    </p>
                  </div>
                  <Switch id="swipe-gallery" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CatalogConfig;
