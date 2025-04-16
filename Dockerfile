FROM node:18-bullseye

RUN apt-get update && apt-get install -y \
    git \
    ncbi-blast+ \
    curl \
    perl \
    build-essential \
    libdatetime-perl \
    libjson-perl \
    liblist-moreutils-perl \
    && curl -sL https://github.com/tseemann/abricate/archive/refs/heads/master.zip -o abricate.zip \
    && unzip abricate.zip && rm abricate.zip \
    && mv abricate-master /opt/abricate \
    && ln -s /opt/abricate/abricate /usr/local/bin/abricate \
    && abricate --setupdb \
    && curl -O https://ftp.ncbi.nlm.nih.gov/pathogen/Antimicrobial_resistance/AMRFinder/latest/amrfinder-linux-latest.tar.gz \
    && tar -xzf amrfinder-linux-latest.tar.gz && rm amrfinder-linux-latest.tar.gz \
    && cd amrfinder-* && ./configure && make && make install && cd .. && rm -rf amrfinder-*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Run the server
CMD [ "npm", "start" ]
