import { z } from "zod";

export const CreateCategoryInputDto = z.object({
  name: z.string(),
  companyId: z.string().uuid(),
  description: z.string().optional(),
  subcategories: z.array(z.string()).optional(),
});

export const CreateCategoryInputBodyDto = CreateCategoryInputDto.omit({
  companyId: true,
});

export type ICreateCategoryInputDto = z.infer<typeof CreateCategoryInputDto>; // usado no backend
export type ICreateCategoryInputBodyDto = z.infer<
  typeof CreateCategoryInputBodyDto
>;
