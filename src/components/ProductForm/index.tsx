
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductInputDto, ICreateProductInputDto } from "@/types/product";
import { Form } from "@/components/ui/form";
import { BasicInfoStep } from "./BasicInfoStep";
import { CategoryStep } from "./CategoryStep";
import { DetailsStep } from "./DetailsStep";
import { StepIndicator, Step } from "./StepIndicator";
import { FormNavigation } from "./FormNavigation";

interface ProductFormProps {
  initialData?: Partial<ICreateProductInputDto>;
  onSuccess?: () => void;
  mode?: "create" | "edit";
}

const ProductForm = ({ initialData, onSuccess, mode = "create" }: ProductFormProps) => {
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

  const steps: Step[] = [
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
        return <BasicInfoStep control={control} />;
      case 1:
        return <CategoryStep control={control} />;
      case 2:
        return (
          <DetailsStep
            control={control}
            uploadedImages={uploadedImages}
            imagePreviews={imagePreviews}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
          />
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
                {mode === "edit" ? "Editar Produto" : "Criar Novo Produto"}
              </h1>
              <p className="text-gray-600 mt-1">
                Configure seu produto com flexibilidade para qualquer nicho
              </p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            isStepCompleted={isStepCompleted}
          />
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
            <FormNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              isCreating={isCreating}
              onPrevStep={prevStep}
              onNextStep={nextStep}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
