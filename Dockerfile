FROM oven/bun:1.0.18-debian as base
RUN apt-get update
RUN apt-get install git curl gnupg zip unzip -yq
RUN cd /app/prasi/repo && git reset --hard && git pull && RUN bun install && bun build
USER bun
EXPOSE 4550/tcp
CMD [ "bun", "run", "prod" ]
