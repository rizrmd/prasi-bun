git reset --hard
git pull
bun run build
bun run db-pull
pm2 restart prasi:4550