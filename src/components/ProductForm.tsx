
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, Plus, Trash2, Save, Package, Image as ImageIcon, Palette, Tag, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductInputDto, ICreateProductInputDto } from "@/types/product";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";

interface ProductFormProps {
  initialData?: Partial<ICreateProductInputDto>;
  onSuccess?: () => void;
}

const ProductForm = ({ initialData, onSuccess }: ProductFormProps) => {
  const navigate = useNavigate();
  const { isCreating, createProduct } = useProducts();
  const [currentStep, setCurrentStep] = useState(0);

  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialData?.images || []
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ICreateProductInputDto>({
    resolver: zodResolver(CreateProductInputDto),
    defaultValues: {
      name: "",
      description: null,
      price: "",
      promotionalPrice: null,
      categoryId: "",
      subcategoryId: null,
      badgeId: null,
      stock: null,
      isActive: true,
      images: [],
      customFields: [],
      ...initialData,
    },
  });

  const { control, handleSubmit, setValue, watch, trigger } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const steps = [
    {
      id: 0,
      title: "Informações Básicas",
      description: "Nome, descrição e preços",
      icon: Package,
      fields: ["name", "description", "price", "promotionalPrice"]
    },
    {
      id: 1,
      title: "Categoria e Classificação",
      description: "Organize seu produto",
      icon: Tag,
      fields: ["categoryId", "subcategoryId", "badgeId"]
    },
    {
      id: 2,
      title: "Detalhes e Configurações",
      description: "Estoque, imagens e campos personalizados",
      icon: Palette,
      fields: ["stock", "isActive", "images", "customFields"]
    }
  ];

  const addCustomField = () => {
    append({
      key: "",
      value: "",
    });
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;

    const previewList: string[] = [];
    const newImageUrls: string[] = [];

    for (const file of Array.from(files)) {
      const previewUrl = URL.createObjectURL(file);
      previewList.push(previewUrl);
      newImageUrls.push(previewUrl);
    }

    setImagePreviews((prev) => [...prev, ...previewList]);
    const updatedUploaded = [...uploadedImages, ...newImageUrls];
    setUploadedImages(updatedUploaded);
    setValue("images", updatedUploaded);
  };

  const removeImage = (index: number) => {
    const newUploaded = [...uploadedImages];
    newUploaded.splice(index, 1);
    setUploadedImages(newUploaded);
    setValue("images", newUploaded);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const nextStep = async () => {
    const currentStepFields = steps[currentStep].fields;
    const isValid = await trigger(currentStepFields as any);
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: ICreateProductInputDto) => {
    createProduct({ body: data });
    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/admin/products");
    }
  };

  const isStepCompleted = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields;
    const values = watch();
    
    return stepFields.some(field => {
      const value = values[field as keyof ICreateProductInputDto];
      return value !== "" && value !== null && value !== undefined;
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nome do Produto *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Camiseta Premium Manga Curta"
                      className="h-12 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Descrição do Produto
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva seu produto de forma atrativa e detalhada..."
                      className="min-h-[120px] text-base resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Preço *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="0.00"
                          className="h-12 text-base pl-8"
                          {...field}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          R$
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="promotionalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Preço Promocional
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="0.00"
                          className="h-12 text-base pl-8"
                          {...field}
                          value={field.value || ""}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          R$
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Categoria Principal *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="roupas">Roupas</SelectItem>
                        <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                        <SelectItem value="casa">Casa e Decoração</SelectItem>
                        <SelectItem value="livros">Livros</SelectItem>
                        <SelectItem value="esportes">Esportes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="subcategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Subcategoria
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione uma subcategoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="camisetas">Camisetas</SelectItem>
                        <SelectItem value="calcas">Calças</SelectItem>
                        <SelectItem value="acessorios">Acessórios</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="badgeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Selo de Destaque
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione um selo (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="novo">🆕 Novo</SelectItem>
                      <SelectItem value="promocao">🔥 Promoção</SelectItem>
                      <SelectItem value="destaque">⭐ Destaque</SelectItem>
                      <SelectItem value="limitado">⏰ Edição Limitada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Stock Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Gestão de Estoque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Quantidade em Estoque
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="0"
                          className="h-12 text-base"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 bg-blue-50 rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          Produto Ativo
                        </FormLabel>
                        <p className="text-xs text-gray-600">
                          Produto será visível no catálogo
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                Imagens do Produto
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      Clique para enviar
                    </span>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG até 10MB</p>
                  </div>
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {imagePreviews.slice(0, 8).map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  Campos Personalizados
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCustomField}
                  className="text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Campo
                </Button>
              </div>

              <p className="text-sm text-gray-600">
                Adicione campos específicos para seu nicho de produtos
              </p>

              {fields.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <Palette className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Nenhum campo personalizado adicionado</p>
                </div>
              )}

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      Campo #{index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`customFields.${index}.key`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Nome do Campo
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Tamanho, Cor, Material"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`customFields.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Valor
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: M, Azul, Algodão"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Criar Novo Produto
              </h1>
              <p className="text-gray-600 mt-1">
                Configure seu produto com flexibilidade para qualquer nicho
              </p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      index <= currentStep
                        ? "bg-blue-600 border-blue-600 text-white"
                        : isStepCompleted(index)
                        ? "bg-green-100 border-green-500 text-green-600"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        index <= currentStep ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-300 mx-4 mt-[-20px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Step Content */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <steps[currentStep].icon className="w-5 h-5 text-blue-600" />
                  {steps[currentStep].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/products")}
                >
                  Cancelar
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium flex items-center gap-2"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Criar Produto
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
