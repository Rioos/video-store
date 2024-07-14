
FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 4000

CMD ["npm", "run", "dev"]