import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.coerce.string(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
