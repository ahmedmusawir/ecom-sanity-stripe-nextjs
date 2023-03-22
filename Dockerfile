FROM node:16.17.1-alpine 

WORKDIR /app

COPY package.json .

RUN npm config set legacy-peer-deps true

RUN npm install 

COPY . .

RUN npm run build 

EXPOSE 8008

CMD ["npm", "start"]
