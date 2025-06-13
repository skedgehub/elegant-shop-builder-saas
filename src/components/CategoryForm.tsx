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

const CategoryForm = ({
  initialData,
  onSuccess,
  mode = "create",
}: CategoryFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCategory, updateCategory, isCreating, isUpdating } =
    useCategories(user?.company_id);

  const [imageUrl, setImageUrl] = useState(initialData?.image || "");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      subcategories: initialData?.subcategories || [""], // agora é um array de string
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });

  const onSubmit = (data: any) => {
    const categoryData = {
      ...data,
      image: imageUrl,
      subcategories: data.subcategories.filter(
        (sub: string) => sub.trim() !== ""
      ),
    };

    if (mode === "edit" && initialData) {
      updateCategory({
        id: initialData.id,
        data: categoryData,
      });
    } else {
      createCategory({ body: categoryData });
    }

    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/admin/categories");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          {mode === "edit" ? "Editar Categoria" : "Nova Categoria"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome da Categoria *
                </Label>
                <Input
                  id="name"
                  {...register("name", { required: "Nome é obrigatório" })}
                  placeholder="Digite o nome da categoria"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Descreva a categoria"
                  rows={3}
                  className="mt-1 resize-none"
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
              <Label className="text-sm font-medium">Subcategorias</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append("")}
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Subcategoria
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    {...register(`subcategories.${index}`, {
                      required: "Subcategoria não pode ser vazia",
                    })}
                    placeholder="Nome da subcategoria"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-2 sm:mr-0" />
                    <span className="sm:hidden">Remover</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onSuccess ? onSuccess() : navigate("/admin/categories")
              }
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="w-full sm:w-auto"
            >
              {isCreating || isUpdating
                ? "Salvando..."
                : mode === "edit"
                ? "Atualizar"
                : "Criar Categoria"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
