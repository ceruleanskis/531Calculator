FROM node:14.18.1 as build-stage

WORKDIR /app

COPY package.json tsconfig.json yarn.lock ./
COPY public ./public/
COPY src ./src/
RUN yarn install && yarn build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage app/build/ .
CMD ["nginx", "-g", "daemon off;"]
