import { z } from "zod";

export const responseGetProfileSchema = {
    200: z.object({
        profile: z.object({
            name: z.string(),
            email: z.email(),
        }),
    }),
    401: z
        .object({
            error: z.string().default("Não autorizado."),
        })
        .describe("Usuário não autenticado."),
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
