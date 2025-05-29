
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface CategoryFormProps {
  initialData?: any;
  onSuccess?: () => void;
  mode?: "create" | "edit";
}

const CategoryForm = ({ initialData, onSuccess, mode = "create" }: CategoryFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCategory, updateCategory, isCreating, isUpdating } = useCategories(user?.company_id);
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      subcategories: initialData?.subcategories || [{ name: "" }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories"
  });

  const onSubmit = (data: any) => {
    const categoryData = {
      ...data,
      image: imageUrl,
      subcategories: data.subcategories.filter((sub: any) => sub.name.trim() !== ""),
    };

    if (mode === "edit" && initialData) {
      updateCategory({
        id: initialData.id,
        data: categoryData
      });
    } else {
      createCategory(categoryData);
    }

    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/admin/categories");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Editar Categoria" : "Nova Categoria"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Categoria *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Nome é obrigatório" })}
                  placeholder="Digite o nome da categoria"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Descreva a categoria"
                  rows={3}
                />
              </div>
            </div>

            {/* Imagem */}
            <div>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                onRemove={() => setImageUrl("")}
                label="Imagem da Categoria"
                bucket="categories"
              />
            </div>
          </div>

          <Separator />

          {/* Subcategorias */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Subcategorias</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ name: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Subcategoria
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`subcategories.${index}.name`)}
                    placeholder="Nome da subcategoria"
                    className="flex-1"
                  />
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
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess ? onSuccess() : navigate("/admin/categories")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? "Salvando..." : (mode === "edit" ? "Atualizar" : "Criar Categoria")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
