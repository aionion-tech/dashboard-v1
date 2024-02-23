"use server";
import { authService } from "@/services";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { User } from "@/types/user.interface";

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await authService.signin(email, password);

  Object.keys(user).forEach((key: string) => {
    const value = (user as any)[key];

    cookies().set(key, value, {
      secure: true,
      path: "/",
      sameSite: "lax",
    });
  });

  return user as User;
}

export async function signupAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await authService.signup(email, password);

  Object.keys(user).forEach((key: string) => {
    const value = (user as any)[key];

    cookies().set(key, value, {
      secure: true,
      path: "/",
      sameSite: "lax",
    });
  });
  return user as User;
}

export async function signoutAction() {
  cookies().delete("id");
  cookies().delete("email");
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  redirect("/");
}
