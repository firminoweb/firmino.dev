"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { adminEmailsFromEnv, consumeLoginToken, destroySession, requestLoginLink } from "@/lib/portal/auth";
import { sendLoginLink } from "@/lib/portal/notify";
import { clearSessionCookie, readSessionCookie, requestOrigin, setSessionCookie } from "@/lib/portal/session";

/** Pede o link de acesso. A resposta é sempre a mesma, exista ou não o e-mail. */
export async function requestLinkAction(_prev: { sent: boolean }, formData: FormData): Promise<{ sent: boolean }> {
  const email = String(formData.get("email") ?? "");
  const res = await requestLoginLink(await getDb(), email, { adminEmails: adminEmailsFromEnv() });
  if (res) {
    const url = `${await requestOrigin()}/cliente/entrar/confirmar?token=${encodeURIComponent(res.token)}`;
    await sendLoginLink(res.user.email, res.user.name, url);
  }
  return { sent: true };
}

/** Clique em "Entrar" na tela de confirmação: consome o link e cria a sessão. */
export async function confirmLoginAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const res = token ? await consumeLoginToken(await getDb(), token) : null;
  if (!res) redirect("/cliente/entrar?expirado=1");
  await setSessionCookie(res.sessionToken);
  redirect(res.user.role === "admin" ? "/cliente/admin" : "/cliente");
}

export async function logoutAction() {
  const token = await readSessionCookie();
  if (token) await destroySession(await getDb(), token);
  await clearSessionCookie();
  redirect("/cliente/entrar");
}
