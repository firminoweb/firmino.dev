import { submitContact } from "@/lib/contact-service";

function clientId(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "anon";
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ success: false, error: "Payload inválido" }, { status: 400 });
  }

  const { status, body } = await submitContact(raw, clientId(request));
  return Response.json(body, { status });
}
