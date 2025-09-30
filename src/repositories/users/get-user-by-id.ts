import { eq } from "drizzle-orm";

import { db } from "../../database/client";
import { userTable } from "../../database/schema";

export const getUserById = async (id: string) => {
    const user = await db
        .select({ name: userTable.name, email: userTable.email })
        .from(userTable)
        .where(eq(userTable.id, id));

    return user;
};
