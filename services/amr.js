const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const removeFiles = (files) => {
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

const runAmrFinder = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}_amrfinder.tsv`;
    const command = `amrfinder -n ${fastaFilePath} -o ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            throw new Error("Lỗi" + error.message)
        }

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                throw new Error("Lỗi" + error.message)
            }
            res.json({ result: data });
        });
    });
};

const changeAmrInfo = async (sample_id, result) => {
    try {
        const lines = result.split("\n").slice(1); 

        const records = lines
            .map(line => {
                const fields = line.split("\t");
                if (fields.length < 22) return null; 

                return {
                    protein_identifier: fields[0] === "NA" ? null : fields[0],
                    contig_id: fields[1] || null,
                    start: parseInt(fields[2], 10) || 0,
                    stop: parseInt(fields[3], 10) || 0,
                    strand: fields[4] || "+",
                    gene_symbol: fields[5] || null,
                    sequence: fields[6] || null,
                    scope: fields[7] || null,
                    element_type: fields[8] || null,
                    class: fields[10] || null,
                    subclass: fields[11] || null,
                    method: fields[12] || null,
                    length: parseInt(fields[13], 10) || 0,
                    reference_length: parseInt(fields[14], 10) || 0,
                    coverage: parseFloat(fields[15]) || 0,
                    identity: parseFloat(fields[16]) || 0,
                    alignment_length: parseInt(fields[17], 10) || 0,
                    accession: fields[18] || null,
                    hmm_accession: fields[20] === "NA" ? null : fields[20],
                    hmm_description: fields[21] === "NA" ? null : fields[21],
                    sample_id
                };
            })
            .filter(record => record !== null); 
        return records
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
};

module.exports = {
    runAmrFinder
};
