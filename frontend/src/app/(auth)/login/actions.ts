
import { z } from "zod";
import { redirect } from "next/navigation";
import { createAuthClient } from "better-auth/react";

export const { signIn } = createAuthClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginAction(_: any, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Credenciales inválidas" };
  }

  const { email, password } = parsed.data;

  const result = await signIn.email({
    email,
    password,
  });

  if (result.error) {
    return { error: result.error.message ?? "Error al iniciar sesión" };
  }

  redirect("/dashboard");
}