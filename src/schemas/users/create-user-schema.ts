import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.coerce.string(),
});

export const responseCreateUserSchema = {
    201: z
        .object({
            success: z.string().default("Usuário cadastrado com sucesso!"),
            id: z.uuid(),
        })
        .describe("Sucesso."),
    409: z
        .object({
            error: z
                .string()
                .default("Usuário já cadastrado em nosso sistema."),
        })
        .describe("Usuário existente."),
    500: z
        .object({
            error: z
                .string()
                .default(
                    "Sistema indisponível no momento, tente novamente mais tarde!"
                ),
        })
        .describe("Sistema indisponível."),
};

export type CreateUser = z.infer<typeof createUserSchema>;
