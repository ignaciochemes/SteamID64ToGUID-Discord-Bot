FROM node:16-buster-slim

ENV APP $APP
ENV API_PORT $API_PORT
ENV TOKEN $TOKEN
ENV DBL_TOKEN $DBL_TOKEN
ENV STEAM_API $STEAM_API
ENV DB_URI $DB_URI
ENV CLIENT_ID $CLIENT_ID

WORKDIR /app
COPY . /app/
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]