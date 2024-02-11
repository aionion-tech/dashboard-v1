"use server";
import { authService } from "@/services";
import { redirect } from "next/navigation";
import { User } from "@/types/user";
import { cookies } from "next/headers";

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

export async function createWorkspace(formData: FormData) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
      }),
    });

    const data = await response.json();

    console.log(data);
    redirect(`/`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createProject(formData: FormData, workspaceId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/project/${workspaceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
        }),
      }
    );

    const data = await response.json();

    console.log(data);
    redirect(`/`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
