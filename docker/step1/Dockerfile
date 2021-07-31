FROM node:12.16.1 As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# CMD ["node", "dist/main.js"]