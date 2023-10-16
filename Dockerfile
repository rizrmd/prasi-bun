# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:alpine as base

RUN apk update
RUN apk add curl unzip nodejs npm

RUN mkdir /prasi
RUN curl https://github.com/rizrmd/prasi-bun/archive/refs/heads/main.zip -Lo /prasi/main.zip --verbose
RUN unzip /prasi/main.zip -d /prasi
WORKDIR /prasi/prasi-bun-main
RUN bun i
RUN cd app/db && bun prisma db pull && bun prisma generate
ENTRYPOINT [ "bun", "prod" ]