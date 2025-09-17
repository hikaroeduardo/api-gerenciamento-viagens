import bcrypt from "bcrypt";

import { CreateUser } from "../../schemas/users/create-user-schema";

import { getUserByEmail } from "../../repositories/users/get-user-by-email";
import { postCreateUser } from "../../repositories/users/post-create-user";
import { UserAlreadyExists } from "../../errors/user-already-exists";

export const createUserService = async ({
    name,
    email,
    password,
}: CreateUser) => {
    const userExists = await getUserByEmail(email);

    if (userExists.length > 0) {
        throw new UserAlreadyExists("Usuário já cadastrado em nosso sistema.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const lowercaseName = name.toLowerCase();
    const lowercaseEmail = email.toLowerCase();

    const { userId } = await postCreateUser({
        name: lowercaseName,
        email: lowercaseEmail,
        password: hashPassword,
    });

    return userId;
};
