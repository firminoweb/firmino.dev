# Área do cliente da firmino.dev

- **Data:** 2026-09-25
- **Status:** aprovado pelo João em conversa ("tudo de uma vez", "já pode ir fazendo")
- **Branch:** `feat/area-do-cliente`
- **Revisão:** substitui a primeira versão desta spec (GitHub App, projeto novo no Neon, entrega em etapas), descartada pelo João.

## Objetivo

**Vender mais.** A área do cliente é diferencial comercial: prova visível de transparência. O cliente acompanha o projeto num lugar só, e o prospect vê isso antes de fechar, pela demo pública.

## Decisões

| Tema | Decisão |
|---|---|
| Onde vive | Dentro do site, isolado em `/cliente`. Páginas públicas continuam estáticas (sem middleware global) |
| Banco | Banco `firminodev` que já existe no projeto **reserveia** do Neon (plano gratuito), via `DATABASE_URL` |
| Dados do projeto | **Manuais**: o João atualiza pelo painel de administração. Sem GitHub App nem integração (evolução opcional futura) |
| Escopo | **Tudo de uma vez**: cronograma, entregas, chamados, documentos e faturas |
| Perfis | Cliente (vê só a própria empresa) e administrador (e-mails em `ADMIN_EMAILS`) |
| Login | Link mágico por e-mail (Resend), sem senha, sem autocadastro |
| Arquivos (PDF) | Guardados no próprio Neon (tabela separada, `bytea`, até 4 MB por arquivo). Sem serviço extra; download só por rota que verifica o dono |
| Demo | Pública e navegável em `/area-do-cliente/demo`, com os mesmos componentes do portal e dados fictícios |

## Autenticação

1. `/cliente/entrar`: a pessoa informa o e-mail. A resposta é sempre a mesma ("se o e-mail estiver cadastrado, você vai receber um link"), para não revelar quem é cliente.
2. Recebem link: usuários ativos cadastrados e e-mails em `ADMIN_EMAILS` (o usuário administrador é criado no primeiro acesso).
3. Limite de 3 links por e-mail a cada 15 minutos, contado no banco.
4. O link leva a `/cliente/entrar/confirmar?token=...`, que mostra o botão **Entrar** (POST). O GET não consome o token, porque scanners de e-mail abrem links sozinhos.
5. Token de uso único, válido por 15 minutos. O consumo é atômico (`UPDATE ... WHERE used_at IS NULL RETURNING`).
6. Sessão de 30 dias no cookie `firmino_session` (`httpOnly`, `secure` em produção, `sameSite=lax`, `path=/cliente`). O banco guarda só o SHA-256 dos tokens.
7. Sair apaga a sessão. Usuário desativado perde o acesso na hora (a sessão é validada junto com `active`).
8. Sem `RESEND_API_KEY` (dev), o link sai no console.

## Dados

| Tabela | Campos |
|---|---|
| `clients` | id, name, created_at |
| `users` | id, email (único, minúsculo), name, role (`admin` \| `client`), client_id (nulo para admin), active, created_at |
| `login_tokens` | id, user_id, token_hash, expires_at, used_at, created_at |
| `sessions` | id, user_id, token_hash, expires_at, created_at |
| `projects` | id, client_id, name, summary, stage, status (`ativo` \| `pausado` \| `concluido`), created_at, updated_at |
| `milestones` | id, project_id, title, description, due_date, status (`planejada` \| `em_andamento` \| `concluida`), position, completed_at |
| `deliveries` | id, project_id, title, description, delivered_on, link_url |
| `tickets` | id, project_id, opened_by, title, status (`aberto` \| `em_andamento` \| `resolvido`), created_at, updated_at |
| `ticket_messages` | id, ticket_id, author_id, body, created_at |
| `documents` | id, client_id, project_id (opcional), kind (`contrato` \| `proposta` \| `nota_fiscal` \| `boleto` \| `relatorio` \| `outro`), title, reference_date, amount_cents, paid, file_name, content_type, size_bytes, created_at |
| `document_files` | document_id, data (`bytea`) |

## Controle de acesso

- Toda leitura do cliente passa por funções de `src/lib/portal/access.ts`, que sempre filtram pelo `client_id` do usuário da sessão. Item de outro cliente responde **404**.
- Toda ação de administrador exige `role = admin`, verificada no servidor em cada Server Action e página.
- Download de documento: rota que verifica o dono antes de devolver o arquivo, com `Content-Disposition: attachment` e `Cache-Control: private, no-store`.

## Telas

**Cliente** (`/cliente`): lista de projetos (redireciona se houver um só) → página do projeto com etapa atual, cronograma, entregas, chamados e documentos; abrir chamado; conversa do chamado; baixar documento; sair.

**Administrador** (`/cliente/admin`): painel com clientes e chamados abertos; cliente (dados, pessoas com acesso, projetos, documentos gerais); projeto (etapa e status, cronograma, entregas, documentos e faturas com upload, chamados); chamado (responder, mudar status).

**Avisos por e-mail (Resend):** novo chamado ou mensagem do cliente → administrador; resposta do administrador, entrega nova e documento novo → pessoas do cliente.

**Público:** `/area-do-cliente` (venda) e `/area-do-cliente/demo` (demo). Entram no sitemap, no `llms.txt` e no Markdown. `/cliente/*` tem `noindex` e `Disallow` no `robots.txt`.

## Desenvolvimento e testes

- Drizzle ORM (`drizzle-orm/neon-http` em produção). Migrações geradas pelo `drizzle-kit` em `drizzle/`, aplicadas com `yarn db:migrate`.
- Sem `DATABASE_URL` em desenvolvimento, o portal usa **PGlite** (Postgres embutido, pasta `.pglite/`, fora do git), para rodar e testar sem credenciais.
- **Vitest + PGlite em memória**, testes escritos antes do código: link (gera, uso único, expira, e-mail desconhecido), sessão (válida, expirada, usuário desativado, logout), isolamento entre clientes (projeto, chamado, documento), bloqueio de não administrador.

## Variáveis de ambiente novas

`DATABASE_URL` (Neon, só servidor, nunca no repositório) e `ADMIN_EMAILS` (separados por vírgula).

## LGPD

Atualizar a Política de Privacidade: a área do cliente guarda nome e e-mail de quem acessa, as mensagens dos chamados e os documentos do projeto, e usa um cookie de sessão.
