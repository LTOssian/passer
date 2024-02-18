FROM node:21-alpine as dev

RUN apk update && apk add git

RUN apk add openssh-client

WORKDIR /home/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM nginx:alpine as prod

# Copy the built Angular application from the build stage to NGINX's HTML directory
COPY --from=dev /home/app/dist/ usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]