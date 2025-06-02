
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Users, 
  BarChart3, 
  Shield,
  Star,
  Play,
  Monitor,
  Smartphone,
  Globe,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Monitor,
      title: "Catálogos Profissionais",
      description: "Crie catálogos online elegantes e responsivos em minutos"
    },
    {
      icon: Smartphone,
      title: "100% Mobile",
      description: "Seus catálogos funcionam perfeitamente em qualquer dispositivo"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Acompanhe visualizações, cliques e performance dos produtos"
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Organize sua base de clientes e histórico de pedidos"
    },
    {
      icon: Globe,
      title: "Domínio Personalizado",
      description: "Use seu próprio domínio para fortalecer sua marca"
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Hospedagem segura com backups automáticos"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Boutique Elegance",
      text: "Aumentei minhas vendas em 300% em apenas 2 meses usando o CatalogoPro",
      rating: 5
    },
    {
      name: "João Santos",
      company: "Tech Store",
      text: "A melhor plataforma para criar catálogos. Interface simples e resultado profissional",
      rating: 5
    },
    {
      name: "Ana Costa",
      company: "Cosméticos Premium",
      text: "Meus clientes adoraram o novo catálogo. Muito mais fácil de navegar",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-inter">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold">CatalogoPro</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">Recursos</a>
              <a href="#testimonials" className="text-gray-600 hover:text-black transition-colors">Depoimentos</a>
              <a href="#pricing" className="text-gray-600 hover:text-black transition-colors">Preços</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button className="bg-black hover:bg-gray-800" asChild>
                <Link to="/register">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gray-100 text-black hover:bg-gray-200">
              ✨ Transforme seu negócio hoje mesmo
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Crie catálogos
              <span className="block bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                profissionais
              </span>
              em minutos
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              A plataforma mais simples e poderosa para criar catálogos online que convertem visitantes em clientes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-black hover:bg-gray-800 px-8 py-6 text-lg" asChild>
                <Link to="/register">
                  Criar Catálogo Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="ghost" size="lg" className="px-8 py-6 text-lg group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Ver Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                14 dias grátis
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Sem cartão de crédito
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Cancele quando quiser
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Tudo que você precisa para vender mais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recursos poderosos desenvolvidos especificamente para impulsionar suas vendas online
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-gray-600">Catálogos Criados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">250%</div>
              <div className="text-gray-600">Aumento Médio em Vendas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Garantido</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-600">Suporte Especializado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Mais de 10.000 empresas confiam em nós
            </h2>
            <p className="text-xl text-gray-600">
              Veja o que nossos clientes estão dizendo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">
              Pronto para transformar
              <span className="block">seu negócio?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Junte-se a milhares de empresas que já aumentaram suas vendas com nossos catálogos
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 px-8 py-6 text-lg" asChild>
                <Link to="/register">
                  Começar Agora
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
                <Link to="/plans">
                  Ver Planos
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Teste grátis por 14 dias. Não é necessário cartão de crédito.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold">CatalogoPro</span>
            </div>
            
            <div className="flex space-x-8 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Privacidade</a>
              <a href="#" className="hover:text-black transition-colors">Termos</a>
              <a href="#" className="hover:text-black transition-colors">Suporte</a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 CatalogoPro. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
