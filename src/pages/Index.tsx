import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
} from "@/components/ui/card";
import {
  Check,
  ArrowRight,
  Package,
  ShoppingCart,
  CreditCard,
  Database,
  BarChart3,
  Smartphone,
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

  const products = [
    {
      icon: Package,
      title: "Catálogo Digital",
      description: "Organize seus produtos de forma profissional com busca avançada e categorização inteligente."
    },
    {
      icon: ShoppingCart,
      title: "Pedidos Online",
      description: "Gestão completa de pedidos em tempo real com notificações automáticas para você e seus clientes."
    },
    {
      icon: CreditCard,
      title: "Pagamentos",
      description: "Receba pagamentos com PIX, cartão de crédito e boleto. Tudo integrado na plataforma."
    },
    {
      icon: Database,
      title: "Gestão Centralizada",
      description: "Gerencie estoque, preços e promoções de um único lugar. Simples e eficiente."
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      description: "Acompanhe vendas, produtos mais vendidos e desempenho com dashboards intuitivos."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Experiência otimizada para mobile. Seus clientes compram de onde estiverem."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-foreground rounded flex items-center justify-center">
                <span className="text-background font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-semibold">Wibbo</span>
            </Link>

            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Começar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Sistema completo de
            <br />
            catálogo e vendas online
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Catálogo digital profissional + pedidos online + pagamentos integrados.
            Tudo em uma única plataforma.
          </p>

          <Link to="/register">
            <Button size="lg" className="h-12 px-8">
              Começar Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <div 
                  key={index} 
                  className="bg-background border p-8 hover:shadow-sm transition-shadow"
                >
                  <div className="mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Veja como funciona</h2>
            <p className="text-lg text-muted-foreground">Demonstração do sistema em ação</p>
          </div>

          <div className="relative aspect-video border overflow-hidden bg-muted/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background border mb-3 cursor-pointer hover:bg-muted transition-colors">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <p className="text-sm text-muted-foreground">Assistir demonstração</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Planos transparentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Starter Plan */}
            <div className="bg-background border p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Starter</h3>
                <p className="text-sm text-muted-foreground">Para começar a vender online</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">R$ 97</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Até 100 produtos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Catálogo digital profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Sistema de pedidos online</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Pagamentos via PIX</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Suporte por email</span>
                </li>
              </ul>

              <Link to="/register" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Começar Agora
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-background border-2 border-foreground p-8 relative">
              <Badge className="absolute -top-3 left-8 bg-foreground text-background">
                Mais Popular
              </Badge>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Pro</h3>
                <p className="text-sm text-muted-foreground">Para escalar suas vendas</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">R$ 197</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Produtos ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Tudo do plano Starter</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Pagamentos via cartão de crédito</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Boleto bancário</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Customização de marca</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>

              <Link to="/register" className="block">
                <Button size="lg" className="w-full">
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Crie seu catálogo e comece a vender em minutos
          </p>
          <Link to="/register">
            <Button size="lg" className="h-12 px-8">
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
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
                <div className="h-7 w-7 bg-foreground rounded flex items-center justify-center">
                  <span className="text-background font-bold text-xs">W</span>
                </div>
                <span className="font-semibold">Wibbo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema completo para vendas online
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Suporte</h4>
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
