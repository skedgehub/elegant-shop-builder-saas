
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Star, ShoppingCart, Users, BarChart, Zap, Shield, Clock, CheckCircle, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">E-Commerce Pro</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Recursos</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Preços</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Depoimentos</a>
              <Button variant="outline" onClick={handleLogin}>Entrar</Button>
              <Button onClick={handleGetStarted}>Começar Grátis</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Recursos</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Preços</a>
                <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Depoimentos</a>
                <div className="flex flex-col space-y-2 mt-4">
                  <Button variant="outline" onClick={handleLogin} className="w-full">Entrar</Button>
                  <Button onClick={handleGetStarted} className="w-full">Começar Grátis</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Nova plataforma lançada
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crie sua loja online
            <span className="text-blue-600"> em minutos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A plataforma completa para criar, gerenciar e expandir seu e-commerce. 
            Com ferramentas poderosas e interface intuitiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} className="text-lg px-8 py-3">
              Começar Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para criar e gerenciar sua loja online de forma profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Setup Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Configure sua loja em poucos minutos com nossos templates prontos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Analytics Avançado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Acompanhe vendas, visitantes e performance em tempo real
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Segurança Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  SSL, backup automático e proteção contra fraudes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Gestão de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  CRM integrado para relacionamento e fidelização
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Carrinho Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Recuperação de carrinho abandonado e upsells automáticos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Suporte 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Atendimento especializado sempre que precisar
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos e Preços
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">Básico</CardTitle>
                <CardDescription className="text-center">
                  <span className="text-3xl font-bold text-gray-900">R$ 29</span>
                  <span className="text-gray-600">/mês</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Até 100 produtos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Domínio personalizado</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte por email</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>SSL gratuito</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-blue-500 border-2">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Mais Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-center">Profissional</CardTitle>
                <CardDescription className="text-center">
                  <span className="text-3xl font-bold text-gray-900">R$ 79</span>
                  <span className="text-gray-600">/mês</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Produtos ilimitados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Analytics avançado</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte prioritário</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Integrações avançadas</span>
                </div>
                <Button className="w-full mt-6">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">Enterprise</CardTitle>
                <CardDescription className="text-center">
                  <span className="text-3xl font-bold text-gray-900">R$ 199</span>
                  <span className="text-gray-600">/mês</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Recursos ilimitados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>API personalizada</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte dedicado</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>White label</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Falar com Vendas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Aumentei minhas vendas em 300% no primeiro mês. A plataforma é incrível!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Maria Silva</p>
                    <p className="text-sm text-gray-600">Loja de Roupas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Interface muito intuitiva. Consegui criar minha loja em menos de 1 hora."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">João Santos</p>
                    <p className="text-sm text-gray-600">Eletrônicos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "O suporte é excepcional. Sempre que preciso, eles me ajudam rapidamente."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Ana Costa</p>
                    <p className="text-sm text-gray-600">Artesanato</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de empreendedores que já transformaram seus negócios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Seu melhor email" 
              className="bg-white"
            />
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleGetStarted}
              className="whitespace-nowrap"
            >
              Começar Agora
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            14 dias grátis • Cancele quando quiser • Sem taxa de setup
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">E-Commerce Pro</span>
              </div>
              <p className="text-gray-400">
                A plataforma completa para seu e-commerce
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 E-Commerce Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
