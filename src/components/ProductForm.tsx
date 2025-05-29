
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProductFormProps {
  initialData?: any;
  onSuccess?: () => void;
  mode?: "create" | "edit";
}

const ProductForm = ({ initialData, onSuccess, mode = "create" }: ProductFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProduct, updateProduct, isCreating, isUpdating } = useProducts(user?.company_id);
  const { categories } = useCategories(user?.company_id);
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");

  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      promotionalPrice: initialData?.promotionalPrice || "",
      category_id: initialData?.category_id || "",
      stock: initialData?.stock || "",
      customFields: initialData?.customFields || [{ name: "", type: "text", required: false }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields"
  });

  const onSubmit = (data: any) => {
    const productData = {
      ...data,
      image: imageUrl,
      price: parseFloat(data.price),
      promotionalPrice: data.promotionalPrice ? parseFloat(data.promotionalPrice) : null,
      stock: parseInt(data.stock),
      customFields: data.customFields.filter((field: any) => field.name.trim() !== ""),
    };

    if (mode === "edit" && initialData) {
      updateProduct({
        id: initialData.id,
        data: productData
      });
    } else {
      createProduct(productData);
    }

    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/admin/products");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Editar Produto" : "Novo Produto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Nome é obrigatório" })}
                  placeholder="Digite o nome do produto"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{String(errors.name.message)}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Descreva o produto"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Preço *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { required: "Preço é obrigatório" })}
                    placeholder="0,00"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600">{String(errors.price.message)}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="promotionalPrice">Preço Promocional</Label>
                  <Input
                    id="promotionalPrice"
                    type="number"
                    step="0.01"
                    {...register("promotionalPrice")}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category_id">Categoria *</Label>
                  <Select onValueChange={(value) => setValue("category_id", value)} defaultValue={initialData?.category_id}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category_id && (
                    <p className="text-sm text-red-600">{String(errors.category_id.message)}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stock">Estoque *</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register("stock", { required: "Estoque é obrigatório" })}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="text-sm text-red-600">{String(errors.stock.message)}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Imagem */}
            <div>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                onRemove={() => setImageUrl("")}
                label="Imagem do Produto"
                bucket="images"
              />
            </div>
          </div>

          <Separator />

          {/* Campos Personalizados */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Campos Personalizados</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ name: "", type: "text", required: false })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Campo
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Nome do Campo</Label>
                      <Input
                        {...register(`customFields.${index}.name`)}
                        placeholder="Ex: Tamanho, Cor"
                      />
                    </div>
                    <div>
                      <Label>Tipo</Label>
                      <Select 
                        onValueChange={(value) => setValue(`customFields.${index}.type`, value)}
                        defaultValue="text"
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Texto</SelectItem>
                          <SelectItem value="number">Número</SelectItem>
                          <SelectItem value="select">Seleção</SelectItem>
                          <SelectItem value="textarea">Texto Longo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        {...register(`customFields.${index}.required`)}
                        id={`required-${index}`}
                      />
                      <Label htmlFor={`required-${index}`}>Obrigatório</Label>
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess ? onSuccess() : navigate("/admin/products")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? "Salvando..." : (mode === "edit" ? "Atualizar" : "Criar Produto")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
