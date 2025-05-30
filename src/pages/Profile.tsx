
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Mail, Phone, Building, Trash2, Edit, Save, X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
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
      <>
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <p>Carregando informações do usuário...</p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie suas informações pessoais</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {user.role === 'admin' ? 'Administrador' : 'Usuário'}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Atualize suas informações de perfil</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      disabled
                      placeholder="ID da empresa"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
                <CardDescription>Ações irreversíveis da conta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <h3 className="font-medium text-red-800 dark:text-red-400 mb-2">Excluir Conta</h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                      Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir Conta
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                            e removerá todos os seus dados de nossos servidores.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                            Sim, excluir conta
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Nome</p>
                    <p className="text-sm text-gray-600">{user.name}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Função</p>
                    <p className="text-sm text-gray-600">
                      {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="pt-4">
                  <Button variant="outline" className="w-full" onClick={() => logout()}>
                    Sair da Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
