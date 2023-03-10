import { UserType } from "@/server/models/User";

export const fetchUser: (userId: string) => Promise<UserType> = async (
  userId: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/user/${userId}`,
    { next: { revalidate: 30 }, method: "GET" }
  );
  const user: UserType = await res.json();
  return user;
};
