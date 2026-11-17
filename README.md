# Menu CMS

CMS (painel administrativo) do **Cardápio Digital**. Permite à equipe do restaurante gerenciar o cardápio consumindo a API NestJS do projeto [menu-backend](https://github.com/Chicosk1/menu-backend).

Tecnologias: Vite, React, Tailwind CSS, shadcn/ui, Axios e TanStack Query (as mesmas do [menu-frontend](https://github.com/Chicosk1/menu-frontend)).

## Funcionalidades

- **Categorias**: listar, cadastrar, editar e excluir (com confirmação).
- **Produtos**: listar (com preço em reais e indicadores de vegetariano e novidade), filtrar por categoria, cadastrar, editar e excluir (com confirmação).

## Pré-requisitos

- Node.js 20 ou superior
- API do [menu-backend](https://github.com/Chicosk1/menu-backend) em execução (por padrão em `http://localhost:3000`)

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo `.env` a partir do exemplo e ajuste a URL da API, se necessário:

   ```bash
   cp .env.example .env
   ```

3. Inicie o projeto em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:5173`.

## Variáveis de ambiente

| Variável       | Descrição                 | Exemplo                 |
| -------------- | ------------------------- | ----------------------- |
| `VITE_API_URL` | URL base da API NestJS    | `http://localhost:3000` |

## Estrutura

```
src/
├── cases/              # Um módulo por entidade (dtos, services, hooks, components)
│   ├── categories/
│   └── products/
├── components/
│   ├── layout/         # Layout e menu de navegação
│   ├── pages/          # Páginas do CMS
│   ├── shared/         # Componentes reutilizáveis (estados de tela, confirmação)
│   └── ui/             # Componentes do shadcn/ui
└── lib/                # Instância do Axios e utilitários
```
