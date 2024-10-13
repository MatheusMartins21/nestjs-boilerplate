FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate deploy --preview-feature

EXPOSE 3000

COPY .env.production .env

CMD ["npm", "run", "start:prod"]