import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  ArrowRight,
  Package,
  ShoppingCart,
  CreditCard,
  Sparkles,
  Database,
  Code,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PromotionalModal from "@/components/PromotionalModal";

const Index = () => {
  const [showPromotionalModal, setShowPromotionalModal] = useState(false);

  useEffect(() => {
    document.title = "Wibbo - Sistema de Catálogo e Vendas Online";

    const hasShownModal = sessionStorage.getItem('promotionalModalShown');
    if (!hasShownModal) {
      const promotionalTimer = setTimeout(() => {
        setShowPromotionalModal(true);
        sessionStorage.setItem('promotionalModalShown', 'true');
      }, 10000);
      
      return () => clearTimeout(promotionalTimer);
    }
  }, []);

  const features = [
    {
      icon: Package,
      title: "Catálogo Digital",
      description: "Organize e apresente todos os seus produtos de forma profissional com busca avançada e categorização inteligente."
    },
    {
      icon: ShoppingCart,
      title: "Pedidos Online",
      description: "Sistema completo de gestão de pedidos em tempo real com notificações automáticas."
    },
    {
      icon: CreditCard,
      title: "Pagamentos Integrados",
      description: "Receba pagamentos com PIX, cartão de crédito e boleto bancário de forma segura."
    }
  ];

  const benefits = [
    "Catálogo digital profissional pronto para usar",
    "Sistema completo de gestão de pedidos",
    "Pagamentos integrados na plataforma",
    "Experiência mobile otimizada",
    "Suporte especializado incluído",
    "Atualizações automáticas e gratuitas"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Wibbo</span>
            </Link>

            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="rounded-full">Começar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Sistema completo de vendas online</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Catálogo Digital.
            <br />
            <span className="italic font-light">Vendas na Nuvem.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Wibbo unifica catálogo digital com sistema de pagamentos integrado. 
            Crie sua loja online que vende localmente e escala globalmente.
          </p>

          <Link to="/register">
            <Button size="lg" className="rounded-full text-lg px-8 h-14">
              Começar Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
            Nossa missão é transformar vendas online em
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 text-center p-8 hover:shadow-lg transition-shadow">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 text-center p-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 mb-6">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sistema Completo</h3>
              <p className="text-muted-foreground">Do catálogo ao pagamento, tudo em uma única plataforma integrada</p>
            </Card>

            <Card className="border-2 text-center p-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 mb-6">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fácil de Usar</h3>
              <p className="text-muted-foreground">Interface intuitiva que não precisa de conhecimento técnico</p>
            </Card>

            <Card className="border-2 text-center p-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 mb-6">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Experiência Premium</h3>
              <p className="text-muted-foreground">Design profissional que seus clientes vão adorar</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Veja como funciona</h2>
            <p className="text-xl text-muted-foreground">Demonstração completa do sistema</p>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-background/90 border-2 mb-4 cursor-pointer hover:scale-110 transition-transform">
                  <ArrowRight className="h-10 w-10" />
                </div>
                <p className="text-sm font-medium">Clique para assistir</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Tudo que você precisa</h2>
            <p className="text-xl text-muted-foreground">Sistema completo para começar a vender hoje</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl border-2 bg-background">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Crie seu catálogo digital agora e comece a receber pedidos e pagamentos em minutos
          </p>
          <Link to="/register">
            <Button size="lg" className="rounded-full text-lg px-10 h-14">
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-sm">W</span>
                </div>
                <span className="font-semibold">Wibbo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema completo para vendas online
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Ajuda</a></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Acessar</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Wibbo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <PromotionalModal 
        isOpen={showPromotionalModal} 
        onClose={() => setShowPromotionalModal(false)} 
      />
    </div>
  );
};

export default Index;
