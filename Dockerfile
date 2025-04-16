# Chọn base image
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Copy package.json và cài đặt các dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng React.js
RUN npm run build

# Chạy ứng dụng trên cổng 3000
EXPOSE 3000

# Lệnh khởi động ứng dụng React
CMD ["npm", "start"]
