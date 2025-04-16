FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --loglevel=error

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
