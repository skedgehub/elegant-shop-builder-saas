import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { ComponentProps } from "react";
import { Textarea } from "./ui/textarea";

type InputProps = ComponentProps<typeof Textarea>;
type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  onTrailingIconClick?: () => void; // clique no ícone do fim
  disabled?: boolean;
} & Omit<InputProps, "name" | "disabled">;

export function InputTextField<T extends FieldValues>({
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
          {label && (
            <FormLabel>
              {label}
              <span className="text-red-600 font-bold">
                {inputProps?.required ? " *" : ""}
              </span>
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex items-center">
              {startComponent && (
                <div className="absolute left-3 pointer-events-none text-gray-400 flex items-center">
                  {startComponent}
                </div>
              )}

              <Textarea
                {...field}
                {...inputProps}
                disabled={disabled}
                className={`w-full ${startComponent ? "pl-10" : ""} ${
                  endComponent ? "pr-10" : ""
                } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
              />

              {endComponent && (
                <div
                  className="absolute right-3 flex items-center"
                  tabIndex={-1}
                >
                  {endComponent}
                </div>
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
