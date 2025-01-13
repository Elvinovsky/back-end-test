FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache \
  openssl3 \
  && rm -rf /var/cache/apk/*

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "start:dev"]