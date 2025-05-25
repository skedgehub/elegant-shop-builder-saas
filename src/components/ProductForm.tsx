
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowLeft } from "lucide-react";
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
    badge: ""
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [newFieldName, setNewFieldName] = useState("");

  const categories = [
    { id: "electronics", name: "Eletrônicos", subcategories: ["Smartphones", "Notebooks", "Fones"] },
    { id: "clothing", name: "Roupas", subcategories: ["Camisetas", "Calças", "Vestidos"] },
    { id: "shoes", name: "Calçados", subcategories: ["Tênis", "Sapatos", "Sandálias"] },
    { id: "home", name: "Casa & Decoração", subcategories: ["Móveis", "Decoração", "Utensílios"] }
  ];

  const badges = ["Oferta", "Novo", "Promoção", "Liquidação", "Bestseller"];

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  const addCustomField = () => {
    if (newFieldName.trim()) {
      const newField: CustomField = {
        id: Date.now().toString(),
        name: newFieldName,
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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/products")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Novo Produto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Produto</Label>
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
                  placeholder="Descreva o produto"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
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
              </div>

              <div>
                <Label htmlFor="image">URL da Imagem</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Categoria</Label>
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

        <Card>
          <CardHeader>
            <CardTitle>Campos Personalizados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="Nome do campo personalizado"
              />
              <Button type="button" onClick={addCustomField}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-2">
              {customFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Badge variant="outline">{field.name}</Badge>
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
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
      </form>
    </div>
  );
};

export default ProductForm;
