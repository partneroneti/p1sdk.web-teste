FROM --platform=linux/amd64 node:18.16.0 AS build
WORKDIR /code

COPY package.json ./
COPY package-lock.json ./

ENV VITE_API_URL=https://integracao-sodexo-desenvolvimento.partner1.com.br/api

RUN npm i

COPY . .

RUN npm run build

FROM --platform=linux/amd64 nginx:alpine as deploy
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=dist /code/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
