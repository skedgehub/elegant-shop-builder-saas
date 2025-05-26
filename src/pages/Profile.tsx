
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Save,
  Shield,
  Calendar
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Administrador",
    email: "admin@minhaloja.com",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP",
    bio: "Administrador da loja CatalogoPro",
    avatar: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados salvos:", formData);
    // Aqui integraria com Supabase para salvar os dados
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie suas informações pessoais e configurações</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="relative mx-auto w-24 h-24 mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback className="text-lg">
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle>{formData.name}</CardTitle>
              <CardDescription>{formData.email}</CardDescription>
              <Badge className="mx-auto w-fit mt-2">
                <Shield className="h-3 w-3 mr-1" />
                Administrador
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Membro desde Jan 2024</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{formData.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{formData.phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e de contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="address"
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Gerencie sua senha e configurações de segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Senha</h4>
                    <p className="text-sm text-muted-foreground">Última alteração: há 30 dias</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Alterar Senha
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Autenticação em Duas Etapas</h4>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
