# 🎬 Filmes App

Aplicativo web fullstack responsivo para cadastro, edição, visualização e exclusão de filmes, com funcionalidades de login (e-mail/senha e GitHub), busca, filtros e envio de e-mails automáticos com lembretes e recuperação de senha.

Desenvolvido com foco em boas práticas, responsividade, modo escuro, integração com The Movie Database (TMDB) e arquitetura em monorepo com Turborepo.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Frontend (`apps/web`)

- Next.js
- Tailwind CSS
- Zustand
- NextAuth.js (e-mail/senha + GitHub)
- Zod + React Hook Form
- Integração com The Movie Database (TMDB)
- Dark/Light mode

### 🔧 Backend (`apps/api`)

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- Swagger
- Envio de e-mails com Ethereal
- Tarefas agendadas com @nestjs/schedule

### Monorepo

- Turborepo
- Workspaces

---

## 🧩 Funcionalidades

- Autenticação com e-mail/senha e GitHub
- Recuperação de senha via e-mail
- Listagem paginada de filmes (10 por página)
- Busca textual
- Filtros por duração, datas e outros
- Cadastro assistido via integração com TMDB
- Envio automático de lembrete 24h antes da estreia do filme
- Modo claro/escuro com botão de alternância
- Rotas protegidas
- Documentação da API com Swagger

---

## 📁 Estrutura do Monorepo

```
Desafio | Cubos/
├── apps/
│   ├── web/         # Frontend (Next.js)
│   └── api/         # Backend (NestJS)
├── packages/
│   └── core/      # Tipos, schemas e utilitários compartilhados
├── turbo.json       # Configuração do Turborepo
├── package.json     # Workspaces
└── README.md
```

---

## ⚙️ Instalação e Execução

### 📌 Pré-requisitos

- Node.js 18+
- PostgreSQL em execução

### Clonar o projeto

```bash
git clone [https://github.com/jfgallardo/filmes-app.git](https://github.com/jfgallardo/Desafio---Cubos)
cd Desafio---Cubos
npm install
```

### Configurar variáveis de ambiente

Crie os arquivos `.env`:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### ▶️ Iniciar o backend (NestJS) + frontend (Next.js)

```bash
npm  run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Swagger - Documentação da API

Disponível em:

```
http://localhost:3002/api
```

---

## Agendamentos

O backend usa `@nestjs/schedule` para:

- Enviar lembretes por e-mail 24 horas antes do lançamento de um filme

## Autenticação

- JWT
- Login com e-mail/senha e GitHub via NextAuth.js

## Autor

Desenvolvido por [Julio Gallardo](https://github.com/jfgallardo)
