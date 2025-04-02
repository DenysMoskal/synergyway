FROM node:18-alpine as frontend-build

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as backend-build

WORKDIR /app/backend

COPY server/package*.json ./

RUN npm install

COPY server .

FROM nginx:alpine

COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

RUN apk add --update nodejs npm

COPY --from=backend-build /app/backend /app/backend

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 3001

CMD ["/bin/sh", "-c", "cd /app/backend && node server.js & nginx -g 'daemon off;'"] 