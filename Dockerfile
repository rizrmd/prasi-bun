FROM oven/bun:1.0.18-debian as base
WORKDIR /usr/src/prasi
COPY . .

RUN apt-get update
RUN apt-get install -y zip 
RUN bun i -g node-gyp-build-optional-packages

USER bun
EXPOSE 4550/tcp
CMD [ "bun", "run", "prod" ]
