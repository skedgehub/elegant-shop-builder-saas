import { z } from "zod";

export const CreateCategoryInputDto = z.object({
  name: z
    .string({
      coerce: true,
      description: "Nome da categoria",
      required_error: "Nome da categoria é obrigatório",
      invalid_type_error: "Nome da categoria deve ser uma string",
      message: "Nome da categoria deve ser uma string válida",
    })
    .min(2, { message: "Nome da categoria deve ter pelo menos 2 caracteres" }),
  image: z
    .string({
      description: "URL da imagem da categoria",
      invalid_type_error: "URL da imagem da categoria deve ser uma string",
      message: "URL da imagem da categoria deve ser uma string válida",
    })
    .url({
      message: "URL da imagem da categoria deve ser uma URL válida",
    })
    .optional(),
  companyId: z.string().uuid(),
  description: z
    .string({
      description: "Descrição da categoria",
      invalid_type_error: "Descrição da categoria deve ser uma string",
      message: "Descrição da categoria deve ser uma string válida",
    })
    .optional(),
  subcategories: z
    .array(
      z
        .string({
          description: "Nome da subcategoria",
          invalid_type_error: "Nome da subcategoria deve ser uma string",
          message: "Nome da subcategoria deve ser uma string válida",
        })
        .min(2, {
          message: "Nome da subcategoria deve ter pelo menos 2 caracteres",
        }),
    )
    .optional(),
});

export const CreateCategoryInputBodyDto = CreateCategoryInputDto.omit({
  companyId: true,
});

export type ICreateCategoryInputDto = z.infer<typeof CreateCategoryInputDto>; // usado no backend
export type ICreateCategoryInputBodyDto = z.infer<
  typeof CreateCategoryInputBodyDto
>;
