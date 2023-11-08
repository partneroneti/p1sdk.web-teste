FROM --platform=linux/amd64 node:18.16.0 AS build
WORKDIR /code

COPY package.json ./
COPY package-lock.json ./

ENV VITE_API_URL=
ENV VITE_USERNAME=
ENV VITE_PASSWORD=
ENV VITE_GRANT_TYPE=

RUN npm i

COPY . .

RUN npm run build

FROM --platform=linux/amd64 nginx:alpine as deploy
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /code/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
