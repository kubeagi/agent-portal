#!/bin/bash
set -e

image="kubeagi/agent-portal"

# 1.构建静态文件镜像
docker build -t kubeagi/agent-portal-dist:main -f build.dockerfile --secret id=npmrc,src=$HOME/.npmrc .

# 2.将静态文件打包到镜像中
docker build -t $image --secret id=npmrc,src=$HOME/.npmrc .

docker push $image
