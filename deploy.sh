git reset --hard
git pull
bun run build
bun run deploy
pm2 restart prasi:4550