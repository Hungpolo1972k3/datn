const Sample = require('../models/sample');
const crypto = require('crypto');

const createSample = async (user_id, experiment_id,name, header, length, file_name, fastaFilePath) => {
    try {
        const code = crypto.randomBytes(4).toString('hex');
        const newSample = new Sample({
            user_id: user_id,
            experiment_id: experiment_id,
            name: name,
            header: header,
            length: length,
            code: code,
            file_name: file_name,
            fastaFilePath: fastaFilePath || ""
        });
        const savedSample = await newSample.save();
        return savedSample;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};

const getSamplesByExperimentId = async(experiment_id) =>{
    try {
        const samples = await Sample.find({experiment_id: experiment_id});
        return samples;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}

const editSample = async (experiment_id, name) => {
    try {
        const updatedSample = await Sample.findOneAndUpdate(
            { experiment_id: experiment_id },
            { name: name },
            { new: true } 
        );

        return updatedSample;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};

const deleteSample = async (id) => {
    try {
      await Sample.deleteOne({ _id: id });
    } catch (error) {
      throw new Error('Lỗi: ' + error.message);
    }
  };
  
const getAllSamples = async () => {
    try {
        const samples = await Sample.find();
        return samples;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}
module.exports = { createSample, getSamplesByExperimentId, editSample, deleteSample, getAllSamples };
