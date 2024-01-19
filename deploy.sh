git reset --hard
git pull
bun run build
bun run db-pull
rm -rf ../data/lmdb
pm2 restart prasi:4550