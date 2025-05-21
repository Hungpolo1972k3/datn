const Experiment = require('../models/experiment');
const Sample = require('../models/sample');
const User = require('../models/user');
const Virulence = require('../models/virulence');
const Amr = require('../models/amr')

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
      const experimentsWithUser = await Promise.all(
        experiments.map(async (item) => {
          const user = await User.findOne({ _id: item.user_id }); 
          return {
            ...item.toObject(),
            username: user?.username || "Unknown",
          };
        })
      );
  
      return experimentsWithUser;
    } catch (error) {
      throw new Error("Lỗi: " + error.message);
    }
  };
  
  const deleteExperiment = async (id) => {
    try {
      let samples = await Experiment.find({ experiment_id: id });
      await Experiment.deleteOne({ _id: id });
      await Sample.deleteMany({ experiment_id: id });
      const deletePromises = samples.map(async (item) => {
        await Promise.all([
          Virulence.deleteMany({ sample_id: item._id }),
          Amr.deleteMany({ sample_id: item._id }),
        ]);
      });
      await Promise.all(deletePromises);
  
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  };
  
const getExperimentStatisticAdmin = async () => {
  try {
    const users = await User.find().select("username");

    const result = await Promise.all(
      users.map(async (user) => {
        const experiments = await Experiment.find(
          { user_id: user._id },
          { _id: 1, createdAt: 1 }
        ).sort({ createdAt: -1 });
        return {
          user,
          experiments,
          total: experiments.length
        };
      })
    );

    return result;
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
};

module.exports = { createExperiment, getExperimentsByUserId , editExperiment, experimentStatistic, getAllExperiments, deleteExperiment, getExperimentStatisticAdmin };
