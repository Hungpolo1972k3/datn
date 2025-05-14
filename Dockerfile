FROM node:18-bullseye

RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O /tmp/miniconda.sh && \
    bash /tmp/miniconda.sh -b -f -p /opt/conda && \
    rm /tmp/miniconda.sh

ENV PATH=/opt/conda/bin:$PATH

RUN conda config --add channels conda-forge && \
    conda config --add channels bioconda && \
    conda config --set channel_priority strict

RUN conda install -c conda-forge -c bioconda bakta

RUN wget https://zenodo.org/record/10522951/files/db-light.tar.gz -O /opt/db-light.tar.gz && \
    mkdir -p /data/db-light && \
    tar -xzf /opt/db-light.tar.gz -C /data/db-light

RUN amrfinder --update

RUN conda install -y -n base -c conda-forge mamba

RUN mamba create -n abricate_env -c bioconda -c conda-forge abricate && \
    /bin/bash -c "source activate abricate_env && abricate-get_db --db vfdb --force"

ENV PATH /opt/conda/envs/abricate_env/bin:$PATH

RUN wget https://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/ncbi-blast-2.16.0+-x64-linux.tar.gz  
RUN tar xvfz ncbi-blast-2.16.0+-x64-linux.tar.gz
ENV PATH="/ncbi-blast-2.16.0+/bin:$PATH"
 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
