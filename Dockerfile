FROM oven/bun:1.0.18-debian as base
WORKDIR /app/prasi/repo

RUN apt-get update
RUN apt-get install nodejs git curl gnupg zip unzip -yq

EXPOSE 4550/tcp

CMD [ "bun", "run", "prod" ]
