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
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-foreground rounded flex items-center justify-center">
                <span className="text-background font-bold text-xs">W</span>
              </div>
              <span className="font-semibold">Wibbo</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Começar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Sistema completo de
            <br />
            catálogo e vendas online
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Catálogo digital profissional, pedidos online e pagamentos integrados. Tudo em uma única plataforma.
          </p>

          <Link to="/register">
            <Button size="lg" className="h-11 px-8">
              Começar Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <div 
                  key={index} 
                  className="bg-background p-10"
                >
                  <div className="mb-6">
                    <Icon className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold mb-3">{product.title}</h3>
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
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Veja como funciona</h2>
            <p className="text-muted-foreground">Demonstração do sistema em ação</p>
          </div>

          <div className="relative aspect-video border bg-muted/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border bg-background mb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <p className="text-xs text-muted-foreground">Assistir demonstração</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Planos
            </h2>
            <p className="text-muted-foreground">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-background p-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                  <Package className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold">Starter</h3>
              </div>
              
              <div className="mb-2">
                <span className="text-4xl font-bold">R$ 97</span>
                <span className="text-muted-foreground text-sm ml-1">/mês</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-8">Para começar a vender online</p>

              <Link to="/register" className="block mb-8">
                <Button variant="outline" size="default" className="w-full">
                  Começar
                </Button>
              </Link>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Até 100 produtos</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Catálogo digital profissional</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Sistema de pedidos online</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Pagamentos via PIX</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Suporte por email</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-background p-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold">Pro</h3>
                <Badge variant="secondary" className="ml-auto text-xs">Popular</Badge>
              </div>
              
              <div className="mb-2">
                <span className="text-4xl font-bold">R$ 197</span>
                <span className="text-muted-foreground text-sm ml-1">/mês</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-8">Para escalar suas vendas</p>

              <Link to="/register" className="block mb-8">
                <Button size="default" className="w-full">
                  Começar
                </Button>
              </Link>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Produtos ilimitados</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Tudo do plano Starter</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Pagamentos via cartão</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Boleto bancário</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Customização de marca</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground mb-8">
            Crie seu catálogo e comece a vender em minutos
          </p>
          <Link to="/register">
            <Button size="lg" className="h-11 px-8">
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="h-6 w-6 bg-foreground rounded flex items-center justify-center">
                  <span className="text-background font-bold text-xs">W</span>
                </div>
                <span className="font-semibold text-sm">Wibbo</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Sistema completo para vendas online
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-xs">Produto</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-xs">Empresa</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-xs">Suporte</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Ajuda</a></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Acessar</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8">
            <p className="text-xs text-muted-foreground text-center">© 2024 Wibbo. Todos os direitos reservados.</p>
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
