FROM node:16.13.2

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# EXPOSE 5173

CMD ["npm", "start"]