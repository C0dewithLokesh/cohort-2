FROM node:20-alpine

WORKDIR /app

COPY package* .
COPY ./prisma .

# only run these if packgage or prisma file changed
RUN npm install
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
