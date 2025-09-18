import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import {
    loginSchema,
    responseLoginSchema,
} from "../../schemas/auth/login-schema";
import { loginService } from "../../services/auth/login-service";
import { InvalidCredentials } from "../../errors/invalid-credentials";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
    server.post(
        "/login",
        {
            schema: {
                tags: ["Auth"],
                summary: "Autenticar usuário",
                body: loginSchema,
                response: responseLoginSchema,
            },
        },
        async (request, reply) => {
            try {
                const { email, password } = request.body;

                const tratedEmail = email.toLowerCase();

                const token = await loginService({
                    email: tratedEmail,
                    password,
                });

                return reply.status(200).send({ token });
            } catch (err) {
                if (err instanceof InvalidCredentials) {
                    return reply.status(401).send({ error: err.message });
                }

                return reply.status(500).send({
                    error: "Sistema indisponível no momento, tente novamente mais tarde!",
                });
            }
        }
    );
};
