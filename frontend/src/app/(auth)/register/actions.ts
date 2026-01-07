"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";


const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export async function registerAction(_: any, formData: FormData) {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return { error: "Datos inválidos" };
  }

  const { email, password, name } = parsed.data;

  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name
    }
  });

  if (!result.token) {
    return { error: "Error sign up user" };
  }

  redirect("/dashboard");
}
