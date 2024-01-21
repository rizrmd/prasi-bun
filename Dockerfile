FROM oven/bun:1.0.18-debian as base
WORKDIR /app/prasi/repo

RUN apt-get update
RUN apt-get install git curl gnupg zip unzip -yq
RUN git reset --hard
RUN git pull
RUN bun install
RUN bun run build

USER bun
EXPOSE 4550/tcp

CMD [ "bun", "run", "prod" ]
