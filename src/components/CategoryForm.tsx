import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardCopy,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useNavigate } from "react-router-dom";
import {
  CreateCategoryInputBodyDto,
  ICreateCategoryInputBodyDto,
} from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useFiles } from "@/hooks/useFiles";
import { InputField } from "./InputField";
import { Form } from "./ui/form";
import { toast } from "@/hooks/use-toast";

interface CategoryFormProps {
  initialData?: ICreateCategoryInputBodyDto;
  onSuccess?: () => void;
  mode?: "create" | "edit";
}

const CategoryForm = ({ onSuccess, mode = "create" }: CategoryFormProps) => {
  const navigate = useNavigate();
  const { createCategory, isCreating, isUpdating } = useCategories();
  const { getUrlUpload, uploadFile } = useFiles();

  const form = useForm<ICreateCategoryInputBodyDto>({
    resolver: zodResolver(CreateCategoryInputBodyDto),
    defaultValues: {
      subcategories: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });

  const onSubmit = async (data: ICreateCategoryInputBodyDto) => {
    const categoryData = {
      ...data,
      subcategories: data?.subcategories?.filter((sub) => sub.trim() !== ""),
    };

    await createCategory({ body: categoryData });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {mode === "edit" ? "Editar Categoria" : "Criar Nova Categoria"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Seção: Informações da Categoria */}

            <section className="space-y-4 grid grid-cols-2 gap-6">
              <div id="form-category" className="space-y-4">
                <InputField
                  control={form.control}
                  label="Nome da Categoria"
                  placeholder="Ex.: Informatica"
                  name="name"
                  required
                />

                <InputField
                  control={form.control}
                  label="Descrição"
                  name="description"
                  placeholder="Ex.: Categoria voltada para eletrônicos em geral"
                />
              </div>

              <div id="input-image" className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Imagem
                </label>

                {/* Área clicável para upload */}
                <div
                  className={`
                    relative cursor-pointer
                    w-32 h-32
                    rounded-md border-2 border-dashed border-gray-300
                    flex items-center justify-center
                    overflow-hidden
                    hover:border-primary hover:bg-primary/10
                    transition
                    bg-gray-50
                  `}
                  onClick={() =>
                    document.getElementById("image-upload-input")?.click()
                  }
                  aria-label="Clique para selecionar uma imagem"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      document.getElementById("image-upload-input")?.click();
                    }
                  }}
                >
                  {form.watch("image") ? (
                    <img
                      src={form.watch("image")}
                      alt="Preview da imagem selecionada"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <UploadCloud size={36} />
                      <span className="mt-2 text-xs select-none">
                        Clique para carregar
                      </span>
                    </div>
                  )}

                  {/* Input oculto */}
                  <input
                    type="file"
                    id="image-upload-input"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      try {
                        const { url } = await getUrlUpload({
                          body: {
                            ACL: "public-read",
                            contentType: file.type,
                            filename: file.name,
                          },
                        });

                        await uploadFile({ url, file });

                        const publicUrl = (url?.split("?")[0] ?? "").replace(
                          "https://dinez-menu-dev.c460a222af2b5d565e4d623cdff930cc.r2.cloudflarestorage.com",
                          "https://pub-b46038aa790b49da90926aff162180f6.r2.dev",
                        );

                        form.setValue("image", publicUrl);
                        toast({
                          title: "Imagem carregada com sucesso",
                          description: "A imagem foi carregada com sucesso",
                          variant: "default",
                        });
                      } catch (error) {
                        toast({
                          title: "Erro ao fazer upload da imagem",
                          description: "",
                          variant: "destructive",
                        });
                      }
                    }}
                  />
                </div>

                {/* Campo para URL manual */}
                <InputField
                  control={form.control}
                  label="Ou informe uma URL de imagem"
                  name="image"
                  placeholder="Ex.: https://example.com/image.jpg"
                  endComponent={
                    <div className="flex space-x-1">
                      {/* Botão copiar */}
                      <button
                        type="button"
                        aria-label="Copiar URL"
                        className="p-1 hover:bg-gray-200 rounded"
                        onClick={() => {
                          const imageUrl = form.getValues("image") || "";
                          if (imageUrl)
                            navigator.clipboard.writeText(imageUrl).then(() => {
                              toast({
                                title: "URL copiada",
                                description: "",
                                variant: "default",
                              });
                            });
                        }}
                      >
                        <ClipboardCopy size={16} />
                      </button>

                      {/* Botão limpar */}
                      <button
                        type="button"
                        aria-label="Limpar URL"
                        className="p-1 hover:bg-gray-200 rounded"
                        onClick={() => form.setValue("image", "")}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  }
                />
              </div>
            </section>
            <Separator />
            {/* Seção: Subcategorias */}
            <section className="space-y-4 w-full">
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

              <div className="space-x-3 flex flex-wrap">
                {fields.map((field, index) => (
                  <InputField
                    key={field.id}
                    control={form.control}
                    name={`subcategories.${index}`}
                    placeholder="Nome da subcategoria"
                    endComponent={
                      <Button
                        onClick={() => remove(index)}
                        className="bg-transparent border-none hover:bg-destructive/15 w-8 h-8 max-w-20"
                      >
                        <Trash2 className="text-destructive" />
                      </Button>
                    }
                  />
                ))}
              </div>
            </section>
            <Separator />
            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  onSuccess ? onSuccess() : navigate("/admin/categories")
                }
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                <Save className="w-4 h-4 mr-2" />
                {isCreating || isUpdating
                  ? "Salvando..."
                  : mode === "edit"
                    ? "Atualizar Categoria"
                    : "Criar Categoria"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
