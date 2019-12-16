


FROM node:10-alpine as build

# install and cache app dependencies
COPY package.json /app/package.json

WORKDIR /app

#Install dependencies
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . /app

RUN npm run build

# Webapp with nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf.template /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

