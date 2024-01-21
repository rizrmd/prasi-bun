FROM oven/bun:1.0.18-debian as base
WORKDIR /app/prasi/repo
RUN chown -R bun:bun /app/prasi
RUN apt-get update
RUN apt-get install git curl gnupg zip unzip -yq
RUN git reset --hard
RUN git pull
RUN bun install
RUN bun build
USER bun
EXPOSE 4550/tcp
CMD [ "bun", "run", "prod" ]
