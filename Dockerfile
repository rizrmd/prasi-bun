# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:debian as base
WORKDIR /usr/src/app

RUN apt update
RUN apt install git

RUN git clone https://github.com/rizrmd/prasi-bun --depth=1
USER bun
RUN bun i
EXPOSE 4550/tcp
ENTRYPOINT [ "bun", "prod" ]