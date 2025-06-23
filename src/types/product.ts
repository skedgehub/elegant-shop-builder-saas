import { z } from "zod";

export const CreateProductInputDto = z.object({
  name: z.string().describe("Nome do produto"),
  description: z.string().nullable().describe("Descrição opcional do produto"),
  isActive: z.boolean().describe("Produto está ativo?"),
  price: z
    .string()
    .describe("Preço do produto (em string para manter precisão)"),
  categoryId: z.string().describe("ID da categoria"),
  promotionalPrice: z
    .string()
    .nullable()
    .describe("Preço promocional (opcional)"),
  stock: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return null;
      const num = Number(val);
      return isNaN(num) ? val : num;
    }, z.number().nullable())
    .describe("Quantidade em estoque (opcional)"),
  subcategoryId: z
    .string()
    .nullable()
    .describe("ID da subcategoria (opcional)"),
  badgeId: z
    .string()
    .nullable()
    .describe("ID do selo de destaque (opcional)")
    .optional(),
  images: z
    .array(z.string())
    .describe("Lista de imagens do produto")
    .optional(),
  customFields: z
    .array(
      z.object({
        key: z.string().describe("Chave do campo personalizado"),
        value: z.string().describe("Valor do campo personalizado"),
      })
    )
    .optional(),
});

export type ICreateProductInputDto = z.infer<typeof CreateProductInputDto>;
