# base image
FROM node:10-alpine as build

# install and cache app dependencies
COPY package.json /app/package.json
# set working directory
WORKDIR /app

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm i esm
COPY . /app
COPY server.js /app/server.js
RUN npm run build


# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d
EXPOSE 80
CMD "nginx -g daemon off"