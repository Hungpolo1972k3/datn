const Sample = require('../models/sample');
const crypto = require('crypto');
const Virulence = require('../models/virulence');
const Amr = require('../models/amr');
const User = require('../models/user');

const checkExistSample = async(experiment_id, name) => {
  try {
    let existName = await Sample.findOne({experiment_id, name});
    return existName;
  } catch (error) {
    throw new Error('Lỗi: ' + error.message);
  }
}
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
      await Promise.all([
        Sample.deleteOne({ _id: id }),
        Virulence.deleteMany({ sample_id: id }),
        Amr.deleteMany({ sample_id: id })
      ]);
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
const getSampleStatisticAdmin = async () => {
  try {
    const users = await User.find().select("username");

    const result = await Promise.all(
      users.map(async (user) => {
        const samples = await Sample.find(
          { user_id: user._id },
          { _id: 1, createdAt: 1 }
        ).sort({ createdAt: -1 });
        return {
          user,
          samples,
          total: samples.length
        };
      })
    );

    return result;
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
};
module.exports = { createSample, getSamplesByExperimentId, editSample, deleteSample, getAllSamples, getSampleStatisticAdmin, checkExistSample };
