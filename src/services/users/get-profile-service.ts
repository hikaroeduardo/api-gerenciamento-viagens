import { getUserById } from "../../repositories/users/get-user-by-id";

interface GetProfileServiceProps {
    userId: string;
}

export const getProfileService = async ({ userId }: GetProfileServiceProps) => {
    const user = await getUserById(userId);

    return user[0];
};
