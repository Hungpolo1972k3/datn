# Chọn image Node.js
FROM node:18.20.4

# Cài đặt các dependencies của hệ điều hành cần thiết cho Abricate và AMRFinder
RUN apt-get update && apt-get install -y \
    git \
    curl \
    bwa \
    samtools \
    bc \
    make \
    gcc \
    g++ \
    zlib1g-dev \
    libbz2-dev \
    liblzma-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    python3 \
    python3-pip \
    && apt-get clean

# Cài đặt Abricate
RUN git clone https://github.com/tseemann/abricate.git /abricate
WORKDIR /abricate
RUN make && make install

# Cài đặt AMRFinder
RUN git clone https://github.com/ncbi/amrfinder.git /amrfinder
WORKDIR /amrfinder
RUN make && make install

# Tải database vfdb cho Abricate
RUN git clone https://github.com/tseemann/abricate-db.git /abricate-db
WORKDIR /abricate-db
RUN ./get-vfdb.sh

# Cài đặt dependencies của Node.js
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Copy mã nguồn ứng dụng vào container
COPY . .

# Expose cổng ứng dụng
EXPOSE 8080

# Khởi động ứng dụng
CMD ["npm", "run", "dev"]
