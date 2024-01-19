Console to let user manage their AI agents for their preference.

- Add existing agent
- Build your own AI agent
- Chat with agents
- Keep chat history
- ..

## Environment

- node >= v18.17.0

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open <http://localhost:3000> with your browser to see the result.

## Development OIDC 配置

根目录新建 `.env.development`

```
OIDC_SERVER_URL=[OIDC_SERVER_URL]
CLIENT_ID=[CLIENT_ID]
CLIENT_SECRET=[CLIENT_SECRET]
CLIENT_REDIRECT_URI=[CLIENT_REDIRECT_URI]
```
