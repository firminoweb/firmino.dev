import { jsonResponse, errorResponse } from "@/lib/api";
import { getArticles, getProjects } from "@/lib/cms";

/**
 * BFF endpoint que agrega dados do CMS.
 * GET /api/cms?type=articles|projects
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    switch (type) {
      case "articles": {
        const articles = await getArticles();
        return jsonResponse(articles);
      }
      case "projects": {
        const projects = await getProjects();
        return jsonResponse(projects);
      }
      default:
        return errorResponse("Query param 'type' obrigatório: articles | projects", 400);
    }
  } catch {
    return errorResponse("CMS indisponível. Verifique a configuração do Strapi.", 503);
  }
}
