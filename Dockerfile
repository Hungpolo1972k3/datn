FROM node:18-bullseye

# Cài các gói cần thiết cho abricate và amrfinder
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

# Cài abricate
RUN curl -sL https://github.com/tseemann/abricate/archive/refs/heads/master.zip -o abricate.zip \
    && unzip abricate.zip && rm abricate.zip \
    && mv abricate-master /opt/abricate \
    && ln -s /opt/abricate/bin/abricate /usr/local/bin/abricate \
    && abricate --setupdb

# Cài amrfinder
RUN curl -O https://ftp.ncbi.nlm.nih.gov/pathogen/Antimicrobial_resistance/AMRFinder/latest/amrfinder-linux-latest.tar.gz \
    && tar -xzf amrfinder-linux-latest.tar.gz && rm amrfinder-linux-latest.tar.gz \
    && cd amrfinder-* && ./configure && make && make install && cd .. && rm -rf amrfinder-*

# NodeJS app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

# Run the server
CMD [ "npm", "start" ]
