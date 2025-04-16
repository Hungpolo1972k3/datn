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

# Cài đặt Miniconda
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O /tmp/miniconda.sh && \
    bash /tmp/miniconda.sh -b -f -p /opt/conda && \
    rm /tmp/miniconda.sh

# Cập nhật PATH để có thể sử dụng Conda
ENV PATH=/opt/conda/bin:$PATH

# Cài đặt AMRFinder qua Conda
RUN conda config --add channels bioconda && \
    conda config --add channels conda-forge && \
    conda config --set channel_priority strict && \
    conda install -y amrfinder

# Tạo một môi trường conda cho AMRFinder (không bắt buộc, nhưng tốt nhất là tách biệt môi trường)
RUN conda create -n amrfinder_env python=3.8 amrfinder

# Kích hoạt môi trường
RUN echo "conda activate amrfinder_env" >> ~/.bashrc

# Cập nhật cơ sở dữ liệu của AMRFinder
RUN conda activate amrfinder_env && amrfinder --update

# Lệnh để kiểm tra xem AMRFinder có cài đặt thành công không
RUN conda activate amrfinder_env && amrfinder --version

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

# Run the server
CMD [ "npm", "start" ]
