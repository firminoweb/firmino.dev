# Status: área do cliente (2026-09-25)

Documento de continuidade para retomar o trabalho em outra conversa.

## Onde está

| Item | Situação |
|---|---|
| Branch | `feat/area-do-cliente` |
| Commit e push | ✅ Feitos pelo João |
| Pull request | ✅ **Aberta, ainda não mergeada** |
| Deploy em produção | ⏳ Só depois do merge |
| Variáveis na Vercel | ✅ `DATABASE_URL` e `ADMIN_EMAILS`, só em **Production** |
| Banco (Neon, projeto reserveia, banco `firminodev`) | ✅ Migração aplicada: 11 tabelas, 1 migração, 0 usuários |
| Testes | ✅ 26 (Vitest + PGlite); typecheck, lint e build passando |
| Teste no navegador (PGlite local) | ✅ Login admin e cliente, cadastros, upload/download, chamados nos dois sentidos, isolamento (404 em item de outro cliente), remoção de acesso derrubando a sessão |

Spec: `docs/superpowers/specs/2026-09-25-area-do-cliente-design.md`. Regras técnicas: seção "Área do cliente" do `CLAUDE.md`.

## O que foi construído

- **Cliente** (`/cliente`): etapa atual, progresso, próxima entrega, cronograma, entregas (com link), chamados (abrir e conversar), documentos e faturas (valor, pago/pendente, download).
- **Admin** (`/cliente/admin`): painel (chamados em aberto e clientes); cliente (projetos, pessoas com acesso, documentos gerais); projeto (etapa, status, cronograma, entregas, upload de documentos com "Marcar pago", chamados, "Ver como o cliente vê").
- **Login:** link mágico por e-mail (15 min, uso único, botão "Entrar" na confirmação), sessão de 30 dias. Admin = e-mail em `ADMIN_EMAILS` (conta criada no primeiro login).
- **Avisos por e-mail (Resend):** link de acesso; novo chamado/mensagem → equipe; resposta, entrega e documento novos → cliente.
- **Público:** `/area-do-cliente` (venda) e `/area-do-cliente/demo` (projeto fictício "Clínica Exemplo", mesmo componente do portal). No sitemap, `llms.txt` e rodapé.
- **Política de Privacidade** atualizada (dados da área do cliente, Neon, cookie de sessão).

## Depois do merge (próximos passos)

1. Entrar em `https://firmino.dev/cliente/entrar` com o e-mail do `ADMIN_EMAILS`. O link chega por e-mail (Resend já configurada na Vercel).
2. Cadastrar o primeiro cliente real: cliente → pessoa com acesso → projeto → etapa atual e cronograma. Conferir com "Ver como o cliente vê".
3. Avisar o cliente: ele entra em `firmino.dev/cliente/entrar` com o e-mail cadastrado, sem senha.
4. Enviar `/area-do-cliente` e `/area-do-cliente/demo` no Bing (URL Submission) e no Google (Inspeção de URL). O IndexNow roda sozinho no deploy.
5. Se o e-mail com o link não chegar: verificar logs da Vercel (função `/cliente/entrar`) e da Resend no horário da tentativa.

## Como testar localmente (sem tocar em produção)

```bash
PORTAL_PGLITE=1 yarn dev
```

- `PORTAL_PGLITE=1` usa um banco local de teste (`.pglite/`, fora do git), mesmo com a `DATABASE_URL` de produção no `.env.local`. As tabelas são criadas no primeiro acesso.
- Abrir `http://localhost:3000/cliente/entrar` e usar o e-mail do `ADMIN_EMAILS`. Sem `RESEND_API_KEY` local, **o link aparece no terminal** do `yarn dev`: copiar, abrir e clicar em "Entrar".
- Cliente de teste: cadastrar uma pessoa com e-mail qualquer e entrar com ele numa janela anônima (link também no terminal).
- Zerar os dados de teste: parar o `yarn dev` e `rm -rf .pglite`.
- Erro de banco depois de salvar arquivo (hot reload abrindo o PGlite duas vezes): Ctrl+C e subir de novo.
- **Atenção:** sem `PORTAL_PGLITE=1`, o `yarn dev` usa o **banco de produção**.

## Cuidados

- A senha do Neon apareceu num print durante a conversa. Se ainda não foi feito: Neon → Connect → **Reset password**, e atualizar a `DATABASE_URL` no `.env.local` e na Vercel.
- Nunca colocar a `DATABASE_URL` no repositório, em print ou em mensagem.
- Não marcar a `DATABASE_URL` em **Preview** na Vercel (os deploys de teste gravariam no banco de produção).
- Mudou o schema (`src/db/schema.ts`)? `yarn db:generate` e depois `yarn db:migrate` (lê o `.env.local`).

## Pendências e ideias

- **Revisar os textos** de `/area-do-cliente` e da demo (texto novo; mostrar opções ao João antes de mudar).
- **Limitações desta versão:** entrega não tem edição (excluir e registrar de novo); chamado não aceita anexo; nome do admin aparece como a parte do e-mail antes do "@".
- **Títulos dos cases Velana e Celcoin** em linguagem técnica aparecem em 4 páginas de solução para pequenos negócios; reescrever para resultado de negócio (mostrar opções antes).
- **Acompanhamento em 3 a 4 semanas:** GA (leads por canal, canal AI Assistant), Bing (AI Performance), e-mails de lead ("Enviado por").
- Revogar a chave antiga da Resend que ficou no histórico do git, se ainda não foi feito.

## Contexto do dia (já em produção antes desta branch)

Origem dos leads no e-mail; otimização para busca por IA (`llms.txt`, Markdown, JSON-LD, sitemap com datas reais); IndexNow; Bing Webmaster; GA com `generate_lead` como evento-chave e dimensões `method`/`source`/`project_type`; WebMCP, API documentada, Agent Skills, servidor MCP (`/mcp`, testado como conector no Claude), Server Card e ARD; DNSSEC e DNS-AID (`_index` e `_mcp._agents`); firewall no `/api/contact`; 6 páginas de solução (advocacia, viagens, cobrança por Pix, clínicas, academias, escolas). isitagentready: nível 4.
