#!/bin/bash
cd ~/Layout-Project/server || exit
pm2 kill
git pull origin main
npm install
npx tsc -b
pm2 start dist/index.js