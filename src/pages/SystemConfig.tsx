
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  CreditCard, 
  Users,
  Shield,
  Bell,
  Download,
  Trash2,
  AlertTriangle
} from "lucide-react";

const SystemConfig = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
            <p className="text-gray-600">Gerencie sua conta e configurações gerais</p>
          </div>
        </div>

        <Tabs defaultValue="subscription" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="subscription" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Assinatura</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Avançado</span>
            </TabsTrigger>
          </TabsList>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plano Atual</CardTitle>
                  <CardDescription>
                    Gerencie sua assinatura do CatalogoPro
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Professional</h3>
                      <p className="text-gray-600">R$ 79,00/mês</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Produtos utilizados</span>
                      <span>127 / 1.000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full w-[12.7%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subdomínios utilizados</span>
                      <span>1 / 3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full w-[33.3%]"></div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button className="w-full">Gerenciar Assinatura</Button>
                    <Button variant="outline" className="w-full">Alterar Plano</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>
                    Últimas faturas e pagamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "01/01/2024", amount: "R$ 79,00", status: "Pago" },
                      { date: "01/12/2023", amount: "R$ 79,00", status: "Pago" },
                      { date: "01/11/2023", amount: "R$ 79,00", status: "Pago" },
                    ].map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.amount}</p>
                          <p className="text-sm text-gray-600">{payment.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {payment.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuários da Conta</CardTitle>
                <CardDescription>
                  Gerencie quem tem acesso ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">JD</span>
                      </div>
                      <div>
                        <p className="font-medium">João da Silva</p>
                        <p className="text-sm text-gray-600">joao@minhaloja.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Administrador</Badge>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-600">Convide mais usuários para colaborar</p>
                    <Button>Convidar Usuário</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança da Conta</CardTitle>
                  <CardDescription>
                    Configure opções de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input 
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input 
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input 
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="mt-2"
                    />
                  </div>
                  
                  <Button>Alterar Senha</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Autenticação de Dois Fatores</CardTitle>
                  <CardDescription>
                    Adicione uma camada extra de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Autenticação 2FA</Label>
                      <p className="text-sm text-gray-600">Usar app autenticador</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-alerts">Alertas por E-mail</Label>
                      <p className="text-sm text-gray-600">Notificar logins suspeitos</p>
                    </div>
                    <Switch id="email-alerts" defaultChecked />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Ver Dispositivos Conectados
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure quando e como receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                      <p className="text-sm text-gray-600">Receber atualizações importantes</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="product-alerts">Alertas de Produtos</Label>
                      <p className="text-sm text-gray-600">Notificar sobre estoque baixo</p>
                    </div>
                    <Switch id="product-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">E-mails de Marketing</Label>
                      <p className="text-sm text-gray-600">Dicas e novidades do CatalogoPro</p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Relatórios Semanais</Label>
                      <p className="text-sm text-gray-600">Resumo semanal de atividades</p>
                    </div>
                    <Switch id="weekly-reports" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exportar Dados</CardTitle>
                  <CardDescription>
                    Faça backup dos seus dados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Exporte todos os seus produtos, categorias e configurações.
                  </p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
                  <CardDescription>
                    Ações irreversíveis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800">Excluir Conta</h4>
                        <p className="text-sm text-red-600">
                          Esta ação não pode ser desfeita. Todos os dados serão perdidos.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir Conta Permanentemente
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SystemConfig;
