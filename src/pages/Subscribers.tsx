
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, Users, Calendar, CreditCard } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useSubscribers } from "@/hooks/useSubscribers";

const Subscribers = () => {
  const { subscribers, isLoading, createSubscriber, updateSubscriber, deleteSubscriber } = useSubscribers();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: "",
    subscription_tier: "basic",
    subscribed: false
  });

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    createSubscriber({
      email: formData.email,
      subscription_tier: formData.subscription_tier,
    });
    setShowCreateDialog(false);
    setFormData({ email: "", subscription_tier: "basic", subscribed: false });
  };

  const handleEdit = () => {
    if (!selectedSubscriber) return;
    updateSubscriber({
      id: selectedSubscriber.id,
      data: {
        subscription_tier: formData.subscription_tier,
        subscribed: formData.subscribed
      }
    });
    setShowEditDialog(false);
    setSelectedSubscriber(null);
  };

  const openEditDialog = (subscriber: any) => {
    setSelectedSubscriber(subscriber);
    setFormData({
      email: subscriber.email,
      subscription_tier: subscriber.subscription_tier || "basic",
      subscribed: subscriber.subscribed
    });
    setShowEditDialog(true);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Assinantes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie os assinantes e suas assinaturas
            </p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Assinante
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Assinante</DialogTitle>
                <DialogDescription>
                  Adicione um novo assinante ao sistema
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="tier">Plano</Label>
                  <Select value={formData.subscription_tier} onValueChange={(value) => setFormData({ ...formData, subscription_tier: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreate}>Criar Assinante</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar assinantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredSubscribers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Nenhum assinante encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adicione assinantes para começar
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">
                        {subscriber.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {subscriber.subscription_tier === 'basic' && 'Básico'}
                          {subscriber.subscription_tier === 'premium' && 'Premium'}
                          {subscriber.subscription_tier === 'enterprise' && 'Empresarial'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={subscriber.subscribed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {subscriber.subscribed ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDate(subscriber.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(subscriber)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSubscriber(subscriber.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Assinante</DialogTitle>
              <DialogDescription>
                Edite as informações do assinante
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="edit-tier">Plano</Label>
                <Select value={formData.subscription_tier} onValueChange={(value) => setFormData({ ...formData, subscription_tier: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Empresarial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="subscribed"
                  checked={formData.subscribed}
                  onChange={(e) => setFormData({ ...formData, subscribed: e.target.checked })}
                />
                <Label htmlFor="subscribed">Assinatura Ativa</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEdit}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Subscribers;
