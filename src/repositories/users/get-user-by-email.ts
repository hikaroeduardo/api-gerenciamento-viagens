import { eq } from "drizzle-orm";

import { db } from "../../database/client";
import { userTable } from "../../database/schema";

export const getUserByEmail = async (email: string) => {
    const user = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

    return user;
};
