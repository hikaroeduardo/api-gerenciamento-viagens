import { db } from "../../database/client";
import { userTable } from "../../database/schema";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

export const postCreateUser = async ({
    name,
    email,
    password,
}: CreateUserProps) => {
    ("");
    const result = await db
        .insert(userTable)
        .values({ name, email, password })
        .returning({ userId: userTable.id });

    return result[0];
};
