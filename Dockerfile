FROM node:16.13.1

WORKDIR /var/www/api

ADD ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
