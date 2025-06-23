import { z } from "zod";

export const SignUpInputDto = z
  .object({
    displayName: z
      .string({ required_error: "Nome é obrigatório" })
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    provider: z.string().default("email"),
    company: z.object({
      fantasyName: z.string().min(2, "Nome fantasia é obrigatório"),
      legalName: z.string().min(2, "Razão social é obrigatória"),
      cnpj: z
        .string()
        .min(14, "CNPJ deve ter 14 dígitos")
        .max(18, "CNPJ inválido"),
      email: z.string().email("Email da empresa inválido"),
      phone: z
        .string()
        .min(10, "Telefone da empresa deve ter pelo menos 10 dígitos"),
      subdomain: z
        .string()
        .min(3, "Subdomínio deve ter pelo menos 3 caracteres")
        .regex(
          /^[a-z0-9-]+$/,
          "Subdomínio deve conter apenas letras minúsculas, números e hífens"
        ),
      customDomain: z.string().optional().nullable(),
    }),
    planId: z.string().min(1, "Selecione um plano"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ISignUpInputDto = z.infer<typeof SignUpInputDto>;
