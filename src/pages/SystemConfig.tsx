
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { companyService, CompanySettings } from "@/services/companyService";
import { toast } from "@/hooks/use-toast";
import { Save, Globe, Palette, Settings as SettingsIcon, CreditCard } from "lucide-react";

const SystemConfig = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    subdomain: "",
    custom_domain: "",
    primary_color: "#3B82F6",
    secondary_color: "#1E40AF",
    logo_url: "",
  });

  useEffect(() => {
    if (user?.company_id) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    if (!user?.company_id) return;
    
    try {
      const data = await companyService.getCompanySettings(user.company_id);
      if (data) {
        setSettings(data);
        setFormData({
          name: data.name,
          subdomain: data.subdomain,
          custom_domain: data.custom_domain || "",
          primary_color: data.primary_color || "#3B82F6",
          secondary_color: data.secondary_color || "#1E40AF",
          logo_url: data.logo_url || "",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar as configurações da empresa.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user?.company_id) return;
    
    setSaving(true);
    try {
      await companyService.updateCompanySettings(user.company_id, formData);
      toast({
        title: "Configurações salvas!",
        description: "As configurações da empresa foram atualizadas com sucesso.",
      });
      await loadSettings();
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <SettingsIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SettingsIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações da Empresa */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <CardTitle>Informações da Empresa</CardTitle>
            </div>
            <CardDescription>
              Configure as informações básicas da sua empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input
                id="company-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nome da sua empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-url">URL do Logo</Label>
              <Input
                id="logo-url"
                value={formData.logo_url}
                onChange={(e) => handleInputChange("logo_url", e.target.value)}
                placeholder="https://exemplo.com/logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label>Plano Atual</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="capitalize">
                  {settings?.plan || "Básico"}
                </Badge>
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Alterar Plano
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Domínio */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Configurações de Domínio</CardTitle>
            </div>
            <CardDescription>
              Configure os domínios do seu catálogo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomínio</Label>
              <div className="flex">
                <Input
                  id="subdomain"
                  value={formData.subdomain}
                  onChange={(e) => handleInputChange("subdomain", e.target.value)}
                  placeholder="minhaempresa"
                  className="rounded-r-none"
                />
                <div className="bg-gray-100 border border-l-0 px-3 py-2 text-sm text-gray-600 rounded-r-md">
                  .catalogo.com.br
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Seu catálogo estará disponível em: {formData.subdomain}.catalogo.com.br
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="custom-domain">Domínio Personalizado</Label>
              <Input
                id="custom-domain"
                value={formData.custom_domain}
                onChange={(e) => handleInputChange("custom_domain", e.target.value)}
                placeholder="meusite.com.br"
              />
              <p className="text-sm text-gray-500">
                Configure um domínio personalizado para seu catálogo (planos Pro+)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personalização */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Personalização</CardTitle>
            </div>
            <CardDescription>
              Personalize as cores e aparência do seu catálogo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => handleInputChange("primary_color", e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={formData.primary_color}
                      onChange={(e) => handleInputChange("primary_color", e.target.value)}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => handleInputChange("secondary_color", e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={formData.secondary_color}
                      onChange={(e) => handleInputChange("secondary_color", e.target.value)}
                      placeholder="#1E40AF"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Preview das Cores</h4>
                  <div className="space-y-2">
                    <div 
                      className="h-8 rounded flex items-center px-3 text-white text-sm"
                      style={{ backgroundColor: formData.primary_color }}
                    >
                      Cor Primária
                    </div>
                    <div 
                      className="h-8 rounded flex items-center px-3 text-white text-sm"
                      style={{ backgroundColor: formData.secondary_color }}
                    >
                      Cor Secundária
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemConfig;
