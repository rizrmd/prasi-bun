#!/bin/bash

echo "Starting deployment..."

# Reset and pull latest changes
git reset --hard
git pull

# Build the application
echo "Building application..."
bun run build

# Create required directories
echo "Creating required directories..."
mkdir -p ../data/lmdb
mkdir -p data

# Clean LMDB properly (remove contents but keep directory)
if [ -d "../data/lmdb" ]; then
  echo "Cleaning LMDB directory..."
  rm -rf ../data/lmdb/*
fi

# Start production server
echo "Starting production server..."
bun run prod