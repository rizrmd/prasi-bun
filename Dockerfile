FROM imbios/bun-node:1.0.18-21.5.0-debian

COPY coba.ts coba.ts
EXPOSE 4550
CMD [ "bun run coba.ts" ]
