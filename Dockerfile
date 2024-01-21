FROM oven/bun:1.0.18-debian as base
WORKDIR /app/docker
RUN chown -R bun:bun /app/prasi

RUN apt-get update
RUN apt-get install git curl gnupg zip unzip -yq

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update
RUN apt-get install nodejs -yq

RUN npm i -g @parcel/watcher node-gyp-build-optional-packages node-gyp

EXPOSE 4550/tcp

CMD [ "bun", "run", "docker.ts" ]
