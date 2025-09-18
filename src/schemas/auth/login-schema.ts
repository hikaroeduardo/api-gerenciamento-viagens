import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.coerce.string(),
});

export const responseLoginSchema = {
    200: z
        .object({
            token: z.string(),
        })
        .describe("Sucesso."),
    401: z
        .object({
            error: z.string().default("Credenciais inválidas!"),
        })
        .describe("Credenciais inválidas."),
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

export type LoginProps = z.infer<typeof loginSchema>;
