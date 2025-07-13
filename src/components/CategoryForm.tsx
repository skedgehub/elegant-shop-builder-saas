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
  Image as ImageIcon,
  Tag,
  FileText,
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
    <div className="max-w-4xl mx-auto">
      <Card className="border-0">
        <CardHeader className="pb-8">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-2xl font-bold ">
                {mode === "edit" ? "Editar Categoria" : "Nova Categoria"}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {mode === "edit"
                  ? "Atualize as informações da sua categoria"
                  : "Crie uma nova categoria para organizar seus produtos"}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Informações Básicas */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">Informações Básicas</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Formulário */}
                  <div className="lg:col-span-2 space-y-6">
                    <InputField
                      control={form.control}
                      label="Nome da Categoria"
                      placeholder="Ex.: Eletrônicos, Roupas, Casa & Jardim"
                      name="name"
                      required
                      className="text-lg"
                    />

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground/80">
                        Descrição
                      </Label>
                      <Textarea
                        {...register("description")}
                        placeholder="Descreva brevemente esta categoria e que tipos de produtos ela inclui..."
                        className="min-h-[100px] resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Uma boa descrição ajuda seus clientes a encontrar
                        produtos mais facilmente
                      </p>
                    </div>
                  </div>

                  {/* Upload de Imagem */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-foreground/80">
                      Imagem da Categoria
                    </Label>

                    <div className="space-y-4">
                      {/* Preview da imagem */}
                      <div
                        className={cn(
                          "relative group cursor-pointer",
                          "w-full aspect-square max-w-xs mx-auto",
                          "rounded-xl border-2 border-dashed border-primary/30",
                          "flex items-center justify-center",
                          "overflow-hidden transition-all duration-200",
                          "hover:border-primary/60 hover:bg-primary/5",
                          form.watch("image")
                            ? "border-solid border-border"
                            : "",
                        )}
                        onClick={() =>
                          document.getElementById("image-upload-input")?.click()
                        }
                      >
                        {form.watch("image") ? (
                          <>
                            <img
                              src={form.watch("image")}
                              alt="Preview da categoria"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="text-white text-center">
                                <ImageIcon className="h-6 w-6 mx-auto mb-1" />
                                <span className="text-xs">Alterar imagem</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center text-muted-foreground group-hover:text-primary transition-colors">
                            <UploadCloud className="h-12 w-12 mx-auto mb-3" />
                            <p className="text-sm font-medium">
                              Clique para enviar
                            </p>
                            <p className="text-xs">PNG, JPG até 5MB</p>
                          </div>
                        )}

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

                              const publicUrl = (
                                url?.split("?")[0] ?? ""
                              ).replace(
                                "https://dinez-menu-dev.c460a222af2b5d565e4d623cdff930cc.r2.cloudflarestorage.com",
                                "https://pub-b46038aa790b49da90926aff162180f6.r2.dev",
                              );

                              form.setValue("image", publicUrl);
                              toast({
                                title: "Imagem carregada com sucesso",
                                variant: "default",
                              });
                            } catch (error) {
                              toast({
                                title: "Erro ao fazer upload da imagem",
                                variant: "destructive",
                              });
                            }
                          }}
                        />
                      </div>

                      {/* Campo URL alternativo */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Ou cole uma URL de imagem
                        </Label>
                        <InputField
                          control={form.control}
                          name="image"
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="text-xs"
                          endComponent={
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                  const imageUrl =
                                    form.getValues("image") || "";
                                  if (imageUrl) {
                                    navigator.clipboard.writeText(imageUrl);
                                    toast({
                                      title: "URL copiada",
                                      variant: "default",
                                    });
                                  }
                                }}
                              >
                                <ClipboardCopy className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => form.setValue("image", "")}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Subcategorias */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Subcategorias</h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("")}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Organize melhor seus produtos criando subcategorias
                  específicas
                </p>

                {fields.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative group p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200"
                      >
                        <InputField
                          control={form.control}
                          name={`subcategories.${index}`}
                          placeholder="Nome da subcategoria"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                    <Tag className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      Nenhuma subcategoria adicionada ainda
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append("")}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar primeira subcategoria
                    </Button>
                  </div>
                )}
              </div>

              <Separator className="my-8" />

              {/* Ações */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
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
                  className="w-full sm:w-auto gap-2"
                >
                  <Save className="h-4 w-4" />
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
    </div>
  );
};

export default CategoryForm;
