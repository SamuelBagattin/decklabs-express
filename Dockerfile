FROM node:16 AS build-env
COPY . /app
WORKDIR /app

RUN yarn --frozen-lockfile

FROM gcr.io/distroless/nodejs:14
COPY --from=build-env /app /app
WORKDIR /app
CMD ["./bin/www"]

EXPOSE 3000