FROM node:16.13.1

WORKDIR var/www/api

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

ENV NODE_PATH=./dist

RUN yarn tsc

EXPOSE 3333

CMD ["yarn", "dev"]