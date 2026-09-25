import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { listProjectsForUser } from "@/lib/portal/access";
import { STATUS_LABELS } from "@/lib/portal/types";
import { isAdmin, requireUser } from "@/lib/portal/session";

export default async function ClienteHome() {
  const user = await requireUser();
  if (isAdmin(user)) redirect("/cliente/admin");

  const projects = await listProjectsForUser(await getDb(), user);
  if (projects.length === 1) redirect(`/cliente/projetos/${projects[0].id}`);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-[32px] text-text-light">Olá, {user.name.split(" ")[0]}</h1>
      {projects.length === 0 ? (
        <p className="text-[14.5px] text-text-dim">Seu projeto ainda está sendo cadastrado. Em breve ele aparece aqui.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <li key={p.id}>
              <Link href={`/cliente/projetos/${p.id}`} className="gc p-6 block hover:border-accent/40 transition-colors">
                <div className="text-[12px] uppercase tracking-[1.2px] font-semibold text-text-dim mb-1">{STATUS_LABELS.project[p.status]}</div>
                <div className="text-[17px] font-semibold text-text-light">{p.name}</div>
                {p.stage && <div className="text-[13px] text-text-dim mt-1">Etapa: {p.stage}</div>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
