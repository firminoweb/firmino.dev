/* ════════════════════════════════════════════
   BFF API helpers — firmino.dev
   ════════════════════════════════════════════

   Funções utilitárias para os API routes
   agirem como BFF (Backend for Frontend),
   orquestrando chamadas para APIs externas.
   ════════════════════════════════════════════ */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export function jsonResponse<T>(data: T, status = 200): Response {
  return Response.json(
    { success: true, data } satisfies ApiResponse<T>,
    { status },
  );
}

export function errorResponse(message: string, status = 500): Response {
  return Response.json(
    { success: false, error: message } satisfies ApiResponse,
    { status },
  );
}

export async function fetchExternal<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`External API error: ${res.status}`);
  }

  return res.json();
}
