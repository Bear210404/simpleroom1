# Tahap build
FROM node:18-alpine AS builder

# Buat direktori kerja
WORKDIR /app

# Salin semua file (termasuk .env.local)
COPY . .

# Instal dependensi
RUN npm install

# Build Next.js (menggunakan .env.local secara otomatis)
RUN npm run build

# Tahap produksi
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Hanya salin file yang diperlukan untuk produksi
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.env.local .env.local

# Port default Next.js
EXPOSE 3000

# Jalankan server
CMD ["npm", "start"]
