
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Mail, Phone, Building, Trash2, Edit, Save, X, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    company: user?.company_id || ""
  });

  const handleSave = async () => {
    try {
      // Implementar atualização do perfil
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar suas informações.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Implementar exclusão da conta
      toast({
        title: "Conta excluída",
        description: "Sua conta foi excluída com sucesso.",
      });
      logout();
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir sua conta.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <p className="text-center mt-4 text-gray-600">Carregando informações do usuário...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie suas informações pessoais e configurações da conta</p>
        </div>
        <Badge variant="outline" className="text-sm flex items-center gap-2">
          <Shield className="h-4 w-4" />
          {user.role === 'admin' ? 'Administrador' : 'Usuário'}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                  <CardDescription>Atualize suas informações de perfil e dados de contato</CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleSave} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Salvar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="(11) 99999-9999"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm font-medium">ID da Empresa</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    disabled
                    placeholder="ID da empresa"
                    className="mt-1 bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-red-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Zona de Perigo
              </CardTitle>
              <CardDescription>Ações irreversíveis da conta - proceda com cautela</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                <h3 className="font-medium text-red-800 dark:text-red-400 mb-2">Excluir Conta Permanentemente</h3>
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                  Esta ação é irreversível. Todos os seus dados, produtos, pedidos e configurações serão permanentemente removidos dos nossos servidores.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Excluir Conta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                        e removerá todos os seus dados, incluindo produtos, pedidos e configurações
                        de nossos servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                        Sim, excluir permanentemente
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Resumo da Conta</CardTitle>
              <CardDescription>Informações principais do seu perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Nome</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.name}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">E-mail</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <Building className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Função</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-gray-50 dark:hover:bg-gray-800" 
                  onClick={() => logout()}
                >
                  Sair da Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
