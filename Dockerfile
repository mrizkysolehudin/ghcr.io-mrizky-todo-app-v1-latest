# FROM node
FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn install

RUN yarn add prisma

COPY . .

RUN yarn build

RUN npx prisma generate


CMD ["yarn", "start"]
