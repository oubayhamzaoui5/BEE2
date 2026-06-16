# VPS Test Deploy

This setup runs local Convex on `127.0.0.1:3210` and Next.js on port `3002`.

## Server setup

```bash
sudo apt update
sudo apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## Pull project

```bash
cd /var/www
git clone <YOUR_REPO_URL> bee2
cd bee2
npm ci
cp .env.local.example .env.local
```

## Start local Convex once

```bash
npx convex dev --configure new --dev-deployment local --once
npx convex run seed:seedInitialData
npx convex run seed:replaceEditorialContent
```

## Build and run on port 3001

```bash
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 status
```

Open:

```text
http://YOUR_VPS_IP:3002
```

If firewall is enabled:

```bash
sudo ufw allow 3002/tcp
```

## Update later

```bash
cd /var/www/bee2
git pull
npm ci
npm run build
npx convex run seed:replaceEditorialContent
pm2 restart bee2-web bee2-convex
```
