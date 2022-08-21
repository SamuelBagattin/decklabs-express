FROM node:14 AS build-env
COPY . /app
WORKDIR /app
RUN npm rebuild node-sass
RUN yarn --frozen-lockfile

FROM node:14
COPY --from=build-env /app /app
RUN npm rebuild node-sass
WORKDIR /app
ENTRYPOINT ["node","./bin/www"]

EXPOSE 3001