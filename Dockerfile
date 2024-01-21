# use the official ubuntu image
FROM oven/bun:1.0.18-debian as base
WORKDIR /usr/src/prasi

COPY . .
RUN apt-get update
RUN apt-get install curl gnupg zip unzip -yq
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash 
RUN apt-get install nodejs -yq
RUN npm i -g node-gyp-build-optional-packages @parcel/watcher
RUN bun install
RUN bun run build

EXPOSE 4550
CMD [ "bun run prod" ]
