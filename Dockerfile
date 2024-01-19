# use the official ubuntu image
FROM ubuntu:latest as base
WORKDIR /usr/src

COPY . .

ARG NODE_VERSION=18

RUN apt-get update &&
  apt-get install -y curl &&
  apt-get install unzip

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.18" &&
  ln -s $HOME/.bun/bin/bun /usr/local/bin/bun
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n &&
  bash n $NODE_VERSION &&
  rm n &&
  npm install -g n
RUN npm install -g pm2

# copy env for prisma
COPY app/db/.env-prod app/db/.env

# install dependency
RUN bun --version
RUN bun install

RUN bun run build

# prisma generate and db pull
RUN cd app/db && bun prisma db pull && bun prisma generate

EXPOSE 3000
CMD [ "pm2-runtime", "bun run prod" ]
