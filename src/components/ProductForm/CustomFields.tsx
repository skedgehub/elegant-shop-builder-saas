
import { Control, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Plus, Trash2, Palette } from "lucide-react";
import { ICreateProductInputDto } from "@/types/product";

interface CustomFieldsProps {
  control: Control<ICreateProductInputDto>;
}

export const CustomFields = ({ control }: CustomFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const addCustomField = () => {
    append({
      key: "",
      value: "",
    });
  };

  return (
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
  );
};
