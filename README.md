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

## .env 配置 (示例: ./.env.example)

### 开发模式

```
cp .env.example .env.development
```

复制并重命名为 .env.development, 修改 oidc(必须) 等参数

### 生产模式

```
cp .env.example .env.production
```

复制并重命名为 .env.production, 修改 oidc(必须) 等参数
