FROM node:16-slim AS build
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.22.0
COPY --from=build /app/dist /usr/share/nginx/html
