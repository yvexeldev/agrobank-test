FROM node:18-alpine

WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]