"use server";

import { AuthError } from "next-auth";
import { auth, signIn } from "../../../auth";
import { redirect } from "next/navigation";

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createWorkspace(formData: FormData) {
  const session = (await auth()) as any;
  try {
    const response = await fetch("http://localhost:3000/api/v1/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
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
  const session = (await auth()) as any;
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/project/${workspaceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
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
