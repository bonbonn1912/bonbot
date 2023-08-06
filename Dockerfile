FROM node:18

COPY . .

WORKDIR /src

RUN npm install

WORKDIR /src/client

RUN npm install

WORKDIR /

WORKDIR /src/server

RUN npx prisma db push

RUN npx prisma generate

WORKDIR /

WORKDIR /src

EXPOSE 8000

CMD ["npm", "run", "prod"]