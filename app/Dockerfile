FROM node:21-alpine as dev

WORKDIR /home/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM nginx:alpine as prod

COPY --from=dev /home/app/dist/ usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]