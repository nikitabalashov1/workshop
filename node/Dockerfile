FROM node:16
RUN apt-get update -qq
WORKDIR /app

COPY ["package.json", "package-lock.json", "/app/"]
RUN npm install --production
COPY . .

CMD ["node", "app.js"]
