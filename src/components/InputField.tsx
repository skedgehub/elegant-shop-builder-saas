import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { ComponentProps } from "react";

type InputProps = ComponentProps<typeof Input>;
type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  onTrailingIconClick?: () => void; // clique no ícone do fim
  disabled?: boolean;
} & Omit<InputProps, "name" | "disabled">;

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  startComponent,
  endComponent,
  onTrailingIconClick,
  disabled,
  ...inputProps
}: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              {startComponent && (
                <div className="absolute left-3 pointer-events-none text-gray-400 flex items-center">
                  {startComponent}
                </div>
              )}

              <Input
                {...field}
                {...inputProps}
                disabled={disabled}
                className={`w-full ${startComponent ? "pl-10" : ""} ${
                  endComponent ? "pr-10" : ""
                } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
              />

              {endComponent && (
                <button
                  type="button"
                  onClick={onTrailingIconClick}
                  className="absolute right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {endComponent}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
