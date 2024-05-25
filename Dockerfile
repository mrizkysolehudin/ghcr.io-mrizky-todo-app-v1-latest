FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn install

RUN yarn add prisma

COPY . .


RUN yarn build

RUN npx prisma generate

ENTRYPOINT ["sh", "-c", "sleep 10 && npx prisma migrate dev"]

CMD ["yarn", "start"]
