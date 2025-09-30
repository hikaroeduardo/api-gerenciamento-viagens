import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { verifyToken } from "../_hooks/verify-token";
import { getProfileService } from "../../services/users/get-profile-service";

export const getProfileRoute: FastifyPluginAsyncZod = async (server) => {
    server.get(
        "/users/me",
        {
            preHandler: [verifyToken],
        },
        async (request, reply) => {
            try {
                const { userId } = request;

                if (!userId) {
                    return reply
                        .status(401)
                        .send({ error: "Unauthenticated User." });
                }

                const profile = await getProfileService({ userId });

                return reply.status(200).send({ profile });
            } catch (err) {
                return reply.status(500).send({
                    error: "Sistema indisponível no momento, tente novamente mais tarde!",
                });
            }
        }
    );
};
