#build stage
FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build


# production stage
FROM nginx:stable-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Default port exposure
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
