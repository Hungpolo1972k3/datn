FROM node:18-alpine

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev \
  pixman-dev \
  pangomm-dev \
  musl-dev

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --loglevel=error

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
