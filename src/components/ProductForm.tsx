
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowLeft, Upload, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomField {
  id: string;
  name: string;
  value: string;
}

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    promotionalPrice: "",
    category: "",
    subcategory: "",
    image: "",
    badge: "",
    stock: ""
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const categories = [
    { id: "electronics", name: "Eletrônicos", subcategories: ["Smartphones", "Notebooks", "Fones", "Tablets"] },
    { id: "clothing", name: "Roupas", subcategories: ["Camisetas", "Calças", "Vestidos", "Jaquetas"] },
    { id: "shoes", name: "Calçados", subcategories: ["Tênis", "Sapatos", "Sandálias", "Botas"] },
    { id: "home", name: "Casa & Decoração", subcategories: ["Móveis", "Decoração", "Utensílios", "Iluminação"] }
  ];

  const badges = ["Oferta", "Novo", "Promoção", "Liquidação", "Bestseller"];

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({...formData, image: url});
    setImagePreview(url);
  };

  const addCustomField = () => {
    if (newFieldName.trim()) {
      const newField: CustomField = {
        id: Date.now().toString(),
        name: newFieldName.trim(),
        value: ""
      };
      setCustomFields([...customFields, newField]);
      setNewFieldName("");
    }
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const updateCustomField = (id: string, value: string) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", { ...formData, customFields });
    // Aqui seria enviado para a API
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Novo Produto</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Informações Básicas */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome do Produto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Digite o nome do produto"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descreva o produto detalhadamente"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Preço (R$) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="0,00"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="promotionalPrice">Preço Promocional (R$)</Label>
                      <Input
                        id="promotionalPrice"
                        type="number"
                        step="0.01"
                        value={formData.promotionalPrice}
                        onChange={(e) => setFormData({...formData, promotionalPrice: e.target.value})}
                        placeholder="0,00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="stock">Estoque *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campos Personalizados */}
              <Card>
                <CardHeader>
                  <CardTitle>Campos Personalizados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newFieldName}
                      onChange={(e) => setNewFieldName(e.target.value)}
                      placeholder="Nome do campo (ex: Marca, Cor, Tamanho)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomField())}
                    />
                    <Button type="button" onClick={addCustomField} disabled={!newFieldName.trim()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {customFields.map((field) => (
                      <div key={field.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-shrink-0">
                          <Badge variant="outline" className="font-medium">
                            {field.name}
                          </Badge>
                        </div>
                        <Input
                          value={field.value}
                          onChange={(e) => updateCustomField(field.id, e.target.value)}
                          placeholder={`Valor para ${field.name}`}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomField(field.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {customFields.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <div className="mb-2">Nenhum campo personalizado adicionado</div>
                      <div className="text-sm">Adicione campos como marca, cor, tamanho, etc.</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Imagem */}
              <Card>
                <CardHeader>
                  <CardTitle>Imagem do Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="image">URL da Imagem</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={handleImageChange}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>

                  {/* Preview da Imagem */}
                  <div className="aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setImagePreview("")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Preview da imagem</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Fazer Upload
                  </Button>
                </CardContent>
              </Card>

              {/* Categorização */}
              <Card>
                <CardHeader>
                  <CardTitle>Categorização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Categoria *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value, subcategory: ""})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCategory && (
                    <div>
                      <Label>Subcategoria</Label>
                      <Select value={formData.subcategory} onValueChange={(value) => setFormData({...formData, subcategory: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma subcategoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategory.subcategories.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label>Badge</Label>
                    <Select value={formData.badge} onValueChange={(value) => setFormData({...formData, badge: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um badge (opcional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {badges.map((badge) => (
                          <SelectItem key={badge} value={badge}>
                            {badge}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/products")}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar Produto
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
