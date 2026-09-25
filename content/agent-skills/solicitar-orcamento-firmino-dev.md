---
name: solicitar-orcamento-firmino-dev
description: Envia um pedido de contato ou orçamento para a firmino.dev (desenvolvimento de sites, sistemas, apps e automações com IA sob medida) em nome de uma pessoa que pediu isso explicitamente.
---

# Solicitar orçamento para a firmino.dev

Use esta skill quando a pessoa quiser falar com a firmino.dev sobre um projeto: site, sistema web, app iOS/Android, automação com IA, manutenção de sistema existente ou reforço técnico para agência.

## Antes de enviar

1. Confirme que a pessoa **pediu** para entrar em contato. Nunca envie por conta própria.
2. Reúna e confirme com ela:
   - nome;
   - e-mail para a resposta;
   - empresa (opcional);
   - tipo de projeto: `web`, `mobile`, `ia`, `reforco` ou `outro`;
   - mensagem com contexto: o que o negócio faz, o que precisa, prazo desejado e o que já existe hoje.
3. Se faltar contexto, pergunte. Uma mensagem clara recebe uma estimativa melhor.

## Como enviar (use a primeira opção disponível)

1. **Com o conector MCP da firmino.dev** (https://firmino.dev/mcp): chame `solicitar_orcamento` com `nome`, `email`, `empresa`, `tipo_projeto`, `mensagem` e `pessoa_confirmou: true`, somente depois que a pessoa revisar e autorizar.
2. **No navegador, com WebMCP:** em https://firmino.dev, chame a ferramenta `solicitar_orcamento` com `nome`, `email`, `empresa`, `tipo_projeto` e `mensagem`.
3. **Por API:** `POST https://firmino.dev/api/contact` com JSON `{ name, email, company, projectType, message, elapsedMs }`. Documentação: https://firmino.dev/docs/api (OpenAPI em https://firmino.dev/openapi.json). Envie `elapsedMs` com o tempo, em milissegundos, que a conversa levou para reunir os dados (mínimo 2000).
4. **Sem API disponível:** oriente a pessoa a usar o formulário ou o WhatsApp em https://firmino.dev/contato.

## Depois de enviar

Informe à pessoa que a firmino.dev responde no e-mail informado em até 24h úteis. Se a API devolver `400`, corrija os campos indicados em `fields` e confirme de novo com a pessoa antes de reenviar. Se devolver `429`, espere um minuto.
