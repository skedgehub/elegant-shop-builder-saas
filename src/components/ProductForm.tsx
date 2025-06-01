
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
      promotional_price: initialData?.promotional_price || "",
      category_id: initialData?.category_id || "",
      subcategory: initialData?.subcategory || "",
      stock: initialData?.stock || "",
      badge: initialData?.badge || "",
      custom_fields: initialData?.custom_fields || [{ key: "", value: "" }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "custom_fields"
  });

  const selectedCategoryId = watch("category_id");
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
  const subcategories = selectedCategory?.subcategories || [];

  const onSubmit = (data: any) => {
    const productData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      promotional_price: data.promotional_price ? parseFloat(data.promotional_price) : null,
      category: data.category_id,
      subcategory: data.subcategory,
      image: imageUrl,
      badge: data.badge,
      stock: parseInt(data.stock),
      customFields: data.custom_fields
        .filter((field: any) => field.key.trim() !== "" && field.value.trim() !== "")
        .reduce((acc: any, field: any) => {
          acc[field.key] = field.value;
          return acc;
        }, {}),
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
                  <Label htmlFor="promotional_price">Preço Promocional</Label>
                  <Input
                    id="promotional_price"
                    type="number"
                    step="0.01"
                    {...register("promotional_price")}
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
                  <Label htmlFor="subcategory">Subcategoria</Label>
                  <Select onValueChange={(value) => setValue("subcategory", value)} defaultValue={initialData?.subcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma subcategoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((sub: any, index: number) => (
                        <SelectItem key={index} value={sub.name}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="badge">Badge</Label>
                  <Input
                    id="badge"
                    {...register("badge")}
                    placeholder="Ex: Novo, Promoção"
                  />
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

          {/* Campos Personalizados - Metadados */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label>Informações Adicionais (Metadados)</Label>
                <p className="text-sm text-gray-600">Adicione informações extra sobre o produto como tamanho, cor, material, etc.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ key: "", value: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Campo
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Nome da Informação</Label>
                      <Input
                        {...register(`custom_fields.${index}.key`)}
                        placeholder="Ex: Tamanho, Cor, Material"
                      />
                    </div>
                    <div>
                      <Label>Valor</Label>
                      <Input
                        {...register(`custom_fields.${index}.value`)}
                        placeholder="Ex: Grande, Azul, Algodão"
                      />
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
