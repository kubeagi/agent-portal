# dockerfile of base image
FROM node:20-alpine as builder

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

# Install dependencies modules
ADD .npmrc package.json pnpm-lock.yaml ./

RUN npm i pnpm -g
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
     pnpm install --frozen-lockfile --ignore-scripts

# Build portal
ADD . ./
RUN npm run build && \
  rm -rf .next/cache && \
  mkdir -p /tmp/dist && \
  mv public .next server.mjs package.json -t /tmp/dist/

# Save dist
FROM kubeagi/busybox
COPY --from=builder /tmp/dist /build-files
