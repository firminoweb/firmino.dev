import { jsonResponse, errorResponse } from "@/lib/api";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.name || !body.email || !body.message) {
      return errorResponse("Campos obrigatórios: name, email, message", 400);
    }

    // TODO: Integrar com serviço de email (SendGrid, Resend, etc.)
    // ou salvar no Strapi CMS

    console.log("[Contact Form]", body);

    return jsonResponse({ received: true }, 201);
  } catch {
    return errorResponse("Erro ao processar formulário de contato", 500);
  }
}
