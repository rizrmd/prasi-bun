FROM oven/bun:1.0.18-debian as base
WORKDIR /app/docker
RUN mkdir -p /app/prasi/repo

COPY docker.ts docker.ts
USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", "docker.tsx" ]
