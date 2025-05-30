import axiosConfig from "../axiosConfig"

export const createExperiment = async ({user_id,name, code, engineer, createdTime}) => {
    try {
      const response = await axiosConfig.post(
        '/api/experiment/createexperiment',
        { name, code, engineer, createdTime},
        { params: { user_id } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

export const apiGetExperimentsByUserId = async (user_id) => {
    try {
        const response = await axiosConfig.get('/api/experiment/getexperimentsbyuserid', {
            params: { user_id }
        });
        return response.data;
    } catch (error) {
        throw error.message;
    }
};

export const apiEditExperiment = async (id,name, code, engineer, createdTime) => {
  try {
      const response = await axiosConfig.put('/api/experiment/editexperiment', 
        {name, code, engineer, createdTime},
        {params: {id}}
      );
      return response.data;
  } catch (error) {
      throw error.message;
  }
};

export const apiExperimentStatistic = async (user_id) => {
  try {
      const response = await axiosConfig.get('/api/experiment/experimentstatistic', 
        {params: {user_id}}
      );
      return response.data;
  } catch (error) {
      throw error.message;
  }
};

export const apiGetAllExperiments = async () => {
  try {
      const response = await axiosConfig.get('/api/experiment/getallexperiments');
      return response.data;
  } catch (error) {
      throw error.message;
  }
};

export const apiDeleteExperiment = async (id) => {
  try {
      const response = await axiosConfig.delete('/api/experiment/deleteexperiment',
        {params: {id}}
      );
      return response.data;
  } catch (error) {
      throw error.message;
  }
};

export const apiGetExperimentStatisticAdmin = async () => {
  try {
    const response = await axiosConfig.get('/api/experiment/experimentstatisticadmin');
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

