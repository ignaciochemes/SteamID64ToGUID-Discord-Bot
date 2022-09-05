FROM node:16-buster-slim

ENV APP $APP

WORKDIR /app
COPY . /app/
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]