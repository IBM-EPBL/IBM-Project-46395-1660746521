FROM node:16.6.2-alpine as build-step

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY nginx.conf ./
COPY ./src ./src
COPY ./public ./public
RUN npm install

# RUN npm run build

# FROM nginx:1.17.10-alpine
# COPY --from=build-step /app/build/ /usr/share/nginx/html
# COPY --from=build-step /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["npm", "start"]