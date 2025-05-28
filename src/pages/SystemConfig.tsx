
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Save,
  ArrowLeft,
  Upload,
  Globe,
  Palette
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";

const SystemConfig = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "",
    subdomain: "",
    custom_domain: "",
    logo_url: "",
    primary_color: "#3B82F6",
    secondary_color: "#1E40AF",
    plan: "basic"
  });

  useEffect(() => {
    if (user?.company_id) {
      fetchCompanyData();
    }
  }, [user?.company_id]);

  const fetchCompanyData = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', user?.company_id)
        .single();

      if (error) throw error;

      if (data) {
        setCompanyData({
          name: data.name || "",
          subdomain: data.subdomain || "",
          custom_domain: data.custom_domain || "",
          logo_url: data.logo_url || "",
          primary_color: data.primary_color || "#3B82F6",
          secondary_color: data.secondary_color || "#1E40AF",
          plan: data.plan || "basic"
        });
      }
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('companies')
        .update({
          name: companyData.name,
          custom_domain: companyData.custom_domain,
          logo_url: companyData.logo_url,
          primary_color: companyData.primary_color,
          secondary_color: companyData.secondary_color,
        })
        .eq('id', user?.company_id);

      if (error) throw error;

      toast({
        title: "Configurações salvas!",
        description: "As configurações da empresa foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações do Sistema</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie as configurações da sua empresa</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Informações da Empresa */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Configure as informações básicas da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input
                    id="company-name"
                    value={companyData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite o nome da empresa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomínio</Label>
                  <div className="flex">
                    <Input
                      id="subdomain"
                      value={companyData.subdomain}
                      disabled
                      className="bg-gray-50"
                    />
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md">
                      .lovable.app
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-domain">Domínio Personalizado</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="custom-domain"
                    value={companyData.custom_domain}
                    onChange={(e) => handleInputChange('custom_domain', e.target.value)}
                    placeholder="www.suaempresa.com.br"
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Configure um domínio personalizado para sua loja
                </p>
              </div>

              <div className="space-y-2">
                <ImageUpload
                  label="Logo da Empresa"
                  value={companyData.logo_url}
                  onChange={(url) => handleInputChange('logo_url', url)}
                  onRemove={() => handleInputChange('logo_url', '')}
                  bucket="logos"
                />
              </div>
            </CardContent>
          </Card>

          {/* Personalização */}
          <Card>
            <CardHeader>
              <CardTitle>Personalização</CardTitle>
              <CardDescription>
                Configure as cores e aparência da sua loja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="primary-color"
                      value={companyData.primary_color}
                      onChange={(e) => handleInputChange('primary_color', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <Input
                      value={companyData.primary_color}
                      onChange={(e) => handleInputChange('primary_color', e.target.value)}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="secondary-color"
                      value={companyData.secondary_color}
                      onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <Input
                      value={companyData.secondary_color}
                      onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                      placeholder="#1E40AF"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plano Atual */}
          <Card>
            <CardHeader>
              <CardTitle>Plano Atual</CardTitle>
              <CardDescription>
                Informações sobre seu plano de assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium capitalize">{companyData.plan}</h4>
                  <p className="text-sm text-gray-600">Plano atual da sua empresa</p>
                </div>
                <Button variant="outline">
                  Alterar Plano
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SystemConfig;
