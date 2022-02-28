FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install
RUN npm install -g @angular/cli@^9.0.0 

COPY . /app

RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/* /usr/share/nginx/html
EXPOSE 80
CMD ng serve --host 0.0.0.0