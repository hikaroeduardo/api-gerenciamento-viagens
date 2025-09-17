import {
    FastifyPluginAsyncZod
} from "fastify-type-provider-zod";

import { createUserService } from "../../services/users/create-user-service";
import { UserAlreadyExists } from "../../errors/user-already-exists";

import {
    createUserSchema,
    responseCreateUserSchema,
} from "../../schemas/users/create-user-schema";

export const createUserRoute: FastifyPluginAsyncZod = async (server) => {
    server.post(
        "/users",
        {
            schema: {
                tags: ["Users"],
                summary: "Criar novo usuário",
                body: createUserSchema,
                response: responseCreateUserSchema,
            },
        },
        async (request, reply) => {
            try {
                const { name, email, password } = request.body;

                const userId = await createUserService({
                    name,
                    email,
                    password,
                });

                return reply.status(201).send({
                    success: "Usuário cadastrado com sucesso!",
                    id: userId,
                });
            } catch (err) {
                if (err instanceof UserAlreadyExists) {
                    return reply.status(409).send({ error: err.message });
                }

                return reply.status(500).send({
                    error: "Sistema indisponível no momento, tente novamente mais tarde!",
                });
            }
        }
    );
};
