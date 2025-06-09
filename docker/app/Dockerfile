FROM node:22.16-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]

