# Sử dụng Node.js image
FROM node:18

# Tạo thư mục ứng dụng trong container
WORKDIR /usr/src/app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn của bạn vào container
COPY . .

# Mở cổng mà ứng dụng sẽ chạy trên
EXPOSE 8080

# Chạy ứng dụng
CMD ["npm", "start"]
