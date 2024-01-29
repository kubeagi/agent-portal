# dockerfile of base image
FROM node:18.19-alpine as builder

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies modules
ADD .npmrc package.json pnpm-lock.yaml ./

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm i pnpm -g && pnpm install

# Build portal
ADD . ./
RUN npm run build && \
  rm -rf .next/cache && \
  mkdir -p /tmp/dist && \
  mv public .next server.mjs package.json -t /tmp/dist/

# Save dist
FROM kubeagi/busybox
COPY --from=builder /tmp/dist /build-files
