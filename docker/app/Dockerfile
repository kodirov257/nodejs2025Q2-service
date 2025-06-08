FROM node:22.16-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]

