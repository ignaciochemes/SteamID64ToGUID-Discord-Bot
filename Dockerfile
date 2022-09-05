FROM node:16-buster-slim

ENV APP $APP
ENV TOKEN $TOKEN
ENV STEAM_API $STEAM_API
ENV DB_URI $DB_URI
ENV CLIENT_ID $CLIENT_ID

WORKDIR /app
COPY . /app/
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]