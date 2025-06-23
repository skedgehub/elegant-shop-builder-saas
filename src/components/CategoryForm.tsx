import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useNavigate } from "react-router-dom";
import {
  CreateCategoryInputBodyDto,
  ICreateCategoryInputBodyDto,
} from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
  initialData?: ICreateCategoryInputBodyDto;
  onSuccess?: () => void;
  mode?: "create" | "edit";
}

const CategoryForm = ({ onSuccess, mode = "create" }: CategoryFormProps) => {
  const navigate = useNavigate();
  const { createCategory, isCreating, isUpdating } = useCategories();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCategoryInputBodyDto>({
    resolver: zodResolver(CreateCategoryInputBodyDto),
    mode: "onChange",
    defaultValues: {
      subcategories: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });

  const onSubmit = async (data: ICreateCategoryInputBodyDto) => {
    const categoryData = {
      ...data,
      subcategories: data?.subcategories?.filter((sub) => sub.trim() !== ""),
    };

    createCategory({ body: categoryData });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {mode === "edit" ? "Editar Categoria" : "Criar Nova Categoria"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Seção: Informações da Categoria */}
          <section className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Categoria *</Label>
              <Input
                id="name"
                placeholder="Ex: Eletrônicos, Roupas, Serviços"
                {...register("name")}
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Ex: Categoria voltada para eletrônicos em geral"
                rows={4}
                {...register("description")}
              />
            </div>
          </section>

          <Separator />

          {/* Seção: Subcategorias */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Subcategorias</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append("")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Subcategoria
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="Nome da subcategoria"
                    {...register(`subcategories.${index}`)}
                    className={cn(
                      "flex-1",
                      errors.subcategories?.[index] && "border-red-500"
                    )}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {errors.subcategories &&
                typeof errors.subcategories === "object" && (
                  <p className="text-sm text-red-600">
                    {errors.subcategories.message as string}
                  </p>
                )}
            </div>
          </section>

          <Separator />

          {/* Ações */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onSuccess ? onSuccess() : navigate("/admin/categories")
              }
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Salvando..."
                : mode === "edit"
                ? "Atualizar Categoria"
                : "Criar Categoria"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
