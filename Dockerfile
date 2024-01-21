FROM oven/bun:1.0.18-debian as base
WORKDIR /app/docker
RUN mkdir -p /app/prasi/repo
RUN chown -R bun:bun /app/prasi

RUN apt-get update
RUN apt-get install git curl gnupg zip unzip -yq

COPY docker.ts docker.ts
USER bun
EXPOSE 3000/tcp
EXPOSE 4550/tcp
CMD [ "bun", "run", "docker.ts" ]
