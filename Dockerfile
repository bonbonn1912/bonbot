FROM node:18

COPY . .

WORKDIR /src

RUN npm install

WORKDIR /src/client

RUN npm install

WORKDIR /

WORKDIR /src

EXPOSE 8000

CMD ["npm", "run", "prod"]