FROM --platform=linux/amd64 kubeagi/agent-portal-dist:main as dist

# dockerfile of base image
FROM node:20-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=dist /build-files /usr/src/app

ENV NODE_ENV=production

# Install dependencies modules
ADD .npmrc package.json pnpm-lock.yaml ./
RUN npm i pnpm -g
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
     pnpm install --prod --frozen-lockfile --ignore-scripts

EXPOSE 3000

CMD ["node", "server.mjs"]
