const Experiment = require('../models/experiment');
const Sample = require('../models/sample')

const createExperiment = async ({user_id,name, code, engineer, createdTime}) => {
    try {
        const newExperiment = new Experiment({
            name: name,
            user_id: user_id,
            code: code,
            engineer: engineer,
            createdTime: createdTime || ""
        });
        const savedExperiment = await newExperiment.save();
        return savedExperiment;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};

const getExperimentsByUserId = async(user_id) =>{
    try {
        const experiments = await Experiment.find({user_id: user_id, status: true});
        return experiments;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}

const editExperiment = async (id, name, code, engineer, createdTime) => {
    try {
        const newExperiment = await Experiment.findOneAndUpdate(
            {_id: id}, 
            {
                name: name,
                code: code,
                engineer: engineer,
                createdTime: createdTime || ""
            },
            { new: true } 
        );
        return newExperiment;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};

const experimentStatistic = async(user_id) => {
    try {
        let countExperiment = 0;
        let countSample = 0;
        if (!user_id) {
            countExperiment = await Experiment.countDocuments();
            countSample = await Sample.countDocuments();
          } else {
            countExperiment = await Experiment.countDocuments({ user_id: user_id });
            countSample = await Sample.countDocuments({ user_id: user_id });
          }
        return { countExperiment, countSample };
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}

const getAllExperiments = async () => {
    try {
        const experiments = await Experiment.find();
        return experiments;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}

module.exports = { createExperiment, getExperimentsByUserId , editExperiment, experimentStatistic, getAllExperiments };
