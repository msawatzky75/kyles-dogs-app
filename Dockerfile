FROM node:10-alpine as build-deps

WORKDIR /usr/src/kyles-dogs-app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build



# Stage 2 - the production environment

FROM nginx:1.12-alpine

COPY --from=build-deps /usr/src/kyles-dogs-app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]