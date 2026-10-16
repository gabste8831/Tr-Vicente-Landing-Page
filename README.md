# Vicente Transportes — Landing Page

Landing page institucional da TR Vicente, construída em **Next.js 16 (App Router) + TypeScript + CSS Modules**.

Produção: https://www.trvicente.com.br

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Build de produção

```bash
npm run build
npm run start
```

O site é 100% estático — não precisa de variáveis de ambiente nem de backend.

## Estrutura

```
src/
  app/
    layout.tsx          # fonte Montserrat (self-hosted via @fontsource), metadata e favicon
    page.tsx            # monta todas as seções na ordem
    globals.css         # tokens de cor/espaçamento do design system
  components/
    icons.tsx           # ícones de marca (WhatsApp etc.)
    sections/           # cada seção em sua pasta, com Componente.tsx + Componente.module.css
      header/           # nav fixo + menu mobile
      hero/
      about/
      services/
      coverage/         # animação por frames (public/coverage-frames)
      differentiators/
      team/
      clients/          # marquee de logos (public/logos-clientes)
      testimonials/     # carrossel de depoimentos
      contact/          # formulário de contato (FormSubmit)
      footer/
public/
  images/               # todas as fotos do site (hero, sobre, equipe) e logos da TR Vicente
  logos-clientes/       # logos dos clientes exibidas no marquee
  coverage-frames/      # frames da animação da seção de cobertura
```

## Formulário de contato (FormSubmit)

O formulário em `src/components/sections/contact/Contact.tsx` envia direto para o e-mail do cliente pelo [FormSubmit](https://formsubmit.co), sem cadastro, login ou chave de API:

```
https://formsubmit.co/ajax/fabiotrvicente@gmail.com
```

- O e-mail chega com o assunto `[Site TR Vicente] <Assunto> — <Nome>` e os dados em formato de tabela.
- O "Responder" do e-mail já vai para o endereço de quem preencheu o formulário.
- Há um campo honeypot (`_honey`) invisível para barrar spam de bots.

**Ativação:** o primeiro envio para um endereço novo dispara um e-mail do FormSubmit com o link "Activate Form". Depois de clicar nele uma vez, todos os envios seguintes chegam normalmente. A ativação é feita por domínio — testes em `localhost` podem pedir uma nova ativação.

Para trocar o e-mail de destino, basta atualizar a constante `CONTACT_ENDPOINT` no topo do arquivo (e ativar o novo endereço da mesma forma).

## Logos de clientes

Ficam em `public/logos-clientes/` e são listadas no array `LOGOS` em `src/components/sections/clients/Clients.tsx`.

**Atenção a maiúsculas/minúsculas:** o caminho no código precisa bater exatamente com o nome do arquivo. No Windows a diferença passa despercebida, mas na Vercel (Linux) a imagem não é encontrada e a logo aparece quebrada.

## Deploy

O repositório está conectado à Vercel: cada push na branch `master` publica automaticamente em produção.
