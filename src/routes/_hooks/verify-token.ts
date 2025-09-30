import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export const verifyToken = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { authorization } = request.headers;

    const token = authorization?.split(" ")[1];

    if (!token) {
        return reply.status(401).send({ error: "Não autorizado." });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT SECRET not defined.");
    }

    try {
        const { sub: id } = jwt.verify(token, jwtSecret);

        request.userId = id as string;
    } catch (err) {
        return reply.status(401).send({ error: "Não autorizado." });
    }
};
