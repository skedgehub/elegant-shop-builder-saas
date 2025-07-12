
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ImageIcon } from "lucide-react";
import { ICreateProductInputDto } from "@/types/product";
import { ImageUpload } from "./ImageUpload";
import { CustomFields } from "./CustomFields";

interface DetailsStepProps {
  control: Control<ICreateProductInputDto>;
  uploadedImages: string[];
  imagePreviews: string[];
  onImageUpload: (files: FileList | null) => void;
  onRemoveImage: (index: number) => void;
}

export const DetailsStep = ({
  control,
  uploadedImages,
  imagePreviews,
  onImageUpload,
  onRemoveImage,
}: DetailsStepProps) => {
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
        
        <ImageUpload
          uploadedImages={uploadedImages}
          imagePreviews={imagePreviews}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
        />
      </div>

      {/* Custom Fields */}
      <CustomFields control={control} />
    </div>
  );
};
