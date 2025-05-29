
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ImageUpload";
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

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      promotional_price: initialData?.promotional_price || "",
      stock: initialData?.stock || "",
      category_id: initialData?.category_id || "",
      subcategory: initialData?.subcategory || "",
      badge: initialData?.badge || "",
    }
  });

  const watchedCategoryId = watch("category_id");

  const onSubmit = (data: any) => {
    const productData = {
      ...data,
      price: parseFloat(data.price),
      promotional_price: data.promotional_price ? parseFloat(data.promotional_price) : null,
      stock: parseInt(data.stock),
      image: imageUrl,
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

  const selectedCategory = categories.find(cat => cat.id === watchedCategoryId);

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
                  <p className="text-sm text-red-600">{errors.name.message}</p>
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
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="promotional_price">Preço Promocional</Label>
                  <Input
                    id="promotional_price"
                    type="number"
                    step="0.01"
                    {...register("promotional_price")}
                    placeholder="0.00"
                  />
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
                    <p className="text-sm text-red-600">{errors.stock.message}</p>
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

          {/* Categorização */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category_id">Categoria *</Label>
              <Select
                value={watchedCategoryId}
                onValueChange={(value) => setValue("category_id", value)}
              >
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
              {errors.category_id && (
                <p className="text-sm text-red-600">{errors.category_id.message}</p>
              )}
            </div>

            {selectedCategory?.subcategories && selectedCategory.subcategories.length > 0 && (
              <div>
                <Label htmlFor="subcategory">Subcategoria</Label>
                <Select
                  value={watch("subcategory")}
                  onValueChange={(value) => setValue("subcategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma subcategoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory.subcategories.map((sub: any, index: number) => (
                      <SelectItem key={index} value={sub.name}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
