import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Palette, Save, Eye, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Appearance = () => {
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#1E40AF");
  const [logoUrl, setLogoUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const colorPresets = [
    { name: "Azul", primary: "#3B82F6", secondary: "#1E40AF" },
    { name: "Verde", primary: "#10B981", secondary: "#059669" },
    { name: "Roxo", primary: "#8B5CF6", secondary: "#7C3AED" },
    { name: "Rosa", primary: "#EC4899", secondary: "#DB2777" },
    { name: "Laranja", primary: "#F59E0B", secondary: "#D97706" },
    { name: "Vermelho", primary: "#EF4444", secondary: "#DC2626" },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Aqui você implementaria a lógica para salvar as configurações
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula API call

      toast({
        title: "Configurações salvas!",
        description: "As alterações de aparência foram aplicadas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const applyPreset = (preset: (typeof colorPresets)[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
  };

  return (
    <div className=" mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Aparência
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalize a aparência do seu catálogo
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações de Cores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Esquema de Cores
            </CardTitle>
            <CardDescription>
              Defina as cores principais do seu catálogo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 p-1 rounded border"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-10 p-1 rounded border"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  placeholder="#1E40AF"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Presets de Cores</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    className="h-12 p-2"
                    onClick={() => applyPreset(preset)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                      <span className="text-xs">{preset.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Identidade Visual
            </CardTitle>
            <CardDescription>
              Configure o logo e identidade da sua loja
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="logoUrl">URL do Logo</Label>
              <Input
                id="logoUrl"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://exemplo.com/logo.png"
              />
              <p className="text-xs text-gray-500">
                Recomendamos imagens em formato PNG ou SVG com fundo
                transparente
              </p>
            </div>

            {logoUrl && (
              <div className="space-y-2">
                <Label>Preview do Logo</Label>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-12 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Preview
            </CardTitle>
            <CardDescription>
              Veja como ficará a aparência do seu catálogo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 bg-white dark:bg-gray-900">
              <div
                className="p-4 rounded-lg text-white mb-4"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="flex items-center gap-3">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="h-8 object-contain"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      L
                    </div>
                  )}
                  <h3 className="text-xl font-bold">Minha Loja</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                  <h4 className="font-medium mb-2">Produto Exemplo</h4>
                  <Badge
                    style={{ backgroundColor: primaryColor, color: "white" }}
                  >
                    Oferta
                  </Badge>
                  <p className="text-lg font-bold mt-2">R$ 99,90</p>
                  <Button
                    className="w-full mt-3"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                  <h4 className="font-medium mb-2">Outro Produto</h4>
                  <p className="text-lg font-bold mt-2">R$ 149,90</p>
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appearance;
