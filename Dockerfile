FROM node:18-bullseye

# Cài các Perl + tool cần cho abricate
RUN apt-get update && apt-get install -y \
    git \
    ncbi-blast+ \
    curl \
    perl \
    unzip \
    build-essential \
    libdatetime-perl \
    libjson-perl \
    liblist-moreutils-perl \
    libpath-tiny-perl \
    && rm -rf /var/lib/apt/lists/*

# Cài any2fasta
RUN cd /usr/local/bin \
    && wget https://raw.githubusercontent.com/tseemann/any2fasta/master/any2fasta \
    && chmod +x any2fasta

# Cài abricate
RUN curl -sL https://github.com/tseemann/abricate/archive/refs/heads/master.zip -o abricate.zip \
    && unzip abricate.zip && rm abricate.zip \
    && mv abricate-master /opt/abricate \
    && ln -s /opt/abricate/bin/abricate /usr/local/bin/abricate \
    && abricate --setupdb

# Tải AMRFinder binaries từ GitHub Releases và giải nén
RUN wget https://github.com/ncbi/amr/releases/download/amrfinder_v4.0.19/amrfinder_binaries_v4.0.19.tar.gz -O /tmp/amrfinder_binaries.tar.gz && \
    tar -xvzf /tmp/amrfinder_binaries.tar.gz -C /opt/amrfinder && \
    rm /tmp/amrfinder_binaries.tar.gz

# Cập nhật PATH để Docker có thể tìm thấy amrfinder
ENV PATH="/opt/amrfinder/amrfinder_v4.0.19:${PATH}"

# Kiểm tra xem amrfinder đã có thể chạy được chưa
RUN amrfinder --version

# Chạy AMRFinder Update
RUN amrfinder --update

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

# Run the server
CMD [ "npm", "start" ]
