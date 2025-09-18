import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { LoginProps } from "../../schemas/auth/login-schema";
import { getUserByEmail } from "../../repositories/users/get-user-by-email";
import { InvalidCredentials } from "../../errors/invalid-credentials";

export const loginService = async ({ email, password }: LoginProps) => {
    const result = await getUserByEmail(email);

    if (result.length === 0) {
        throw new InvalidCredentials("Credenciais inválidas!");
    }

    const user = result[0];

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
        throw new InvalidCredentials("Credenciais inválidas!");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT SECRET not defined.");
    }

    const token = jwt.sign({ sub: user.id }, jwtSecret);

    return token;
};
