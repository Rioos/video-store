FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]