import { createHash, randomBytes } from "node:crypto";

/** Token aleatório de 32 bytes em base64url (vai no link e no cookie). */
export function newToken(): string {
  return randomBytes(32).toString("base64url");
}

/** O banco guarda só o hash: um vazamento do banco não entrega sessões nem links. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
