
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowLeft, Save, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "@/hooks/use-toast";

const categorySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  image: z.string().url("URL deve ser válida").optional().or(z.literal("")),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const CategoryForm = () => {
  const navigate = useNavigate();
  const { createCategory, isCreating } = useCategories();
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: ""
    }
  });

  const addSubcategory = () => {
    if (newSubcategory.trim() && !subcategories.includes(newSubcategory.trim())) {
      setSubcategories([...subcategories, newSubcategory.trim()]);
      setNewSubcategory("");
    }
  };

  const removeSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const onSubmit = (data: CategoryFormData) => {
    createCategory({
      ...data,
      subcategories: subcategories,
    });
    
    toast({
      title: "Categoria criada!",
      description: "A categoria foi criada com sucesso.",
    });
    
    navigate("/admin/categories");
  };

  const handleImageChange = (url: string) => {
    setImagePreview(url);
    form.setValue("image", url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/categories")}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nova Categoria</h1>
              <p className="text-gray-600 dark:text-gray-400">Adicione uma nova categoria ao seu catálogo</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Informações Básicas */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Informações da Categoria
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Categoria *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: Eletrônicos, Roupas, Calçados..."
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva brevemente esta categoria..."
                              rows={4}
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Subcategorias */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Subcategorias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                        placeholder="Nome da subcategoria"
                        className="h-11"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubcategory())}
                      />
                      <Button 
                        type="button" 
                        onClick={addSubcategory}
                        disabled={!newSubcategory.trim()}
                        className="h-11 px-6"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {subcategories.map((sub, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                          <Badge variant="secondary" className="text-sm">{sub}</Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubcategory(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {subcategories.length === 0 && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed">
                        <div className="mb-2">Nenhuma subcategoria adicionada</div>
                        <div className="text-sm">Adicione subcategorias para organizar melhor seus produtos</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Imagem */}
              <div className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Imagem da Categoria
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL da Imagem</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://exemplo.com/imagem.jpg"
                              className="h-11"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleImageChange(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Preview da Imagem */}
                    <div className="aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
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
                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Preview da imagem</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Cole uma URL válida acima</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Actions */}
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/categories")}
                    disabled={isCreating}
                    className="h-11 px-6"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isCreating}
                    className="h-11 px-8"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Categoria
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CategoryForm;
