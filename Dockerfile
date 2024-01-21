# use the official ubuntu image
FROM oven/bun:1.0.18-debian
WORKDIR /usr/src
COPY . . 
EXPOSE 4550
CMD [ "bun run coba.ts" ]
