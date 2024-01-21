git reset --hard
git pull
bun run build
rm -rf ../data/lmdb
bun run prod