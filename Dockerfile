
FROM node:10-alpine as build

# install and cache app dependencies
COPY package.json /app/package.json

WORKDIR /app

#Install dependencies
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm i esm

COPY . /app
RUN npm run build

# Boardgame server node
COPY src/server.js /app/server.js
COPY src/game/PAFF.js /app/game/PAFF.js
CMD 'node -r esm server.js'

# Webapp on nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d
EXPOSE 80
CMD "nginx -g daemon off"