
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ICreateProductInputDto } from "@/types/product";

interface BasicInfoStepProps {
  control: Control<ICreateProductInputDto>;
}

export const BasicInfoStep = ({ control }: BasicInfoStepProps) => {
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
};
