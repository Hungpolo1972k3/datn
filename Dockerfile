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

# Cài đặt AMRFinderPlus từ GitHub
RUN git clone https://github.com/ncbi/amr.git /opt/amrfinder \
    && cd /opt/amrfinder \
    && git checkout master \
    && make -C stx clean || true \
    && make \
    && make install

# Tải cơ sở dữ liệu AMRFinderPlus
RUN mkdir /data && cd /data \
    && wget https://zenodo.org/record/14916843/files/db-light.tar.xz \
    && tar -xvf db-light.tar.xz \
    && rm db-light.tar.xz

# Cập nhật cơ sở dữ liệu (nếu cần)
RUN amrfinder_update --force_update --database /data/db-light/amrfinderplus-db/

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

# Run the server
CMD [ "npm", "start" ]
