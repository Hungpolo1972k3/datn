import axiosConfig from "../axiosConfig"

export const apiCreateSample = async (user_id, experiment_id,name, header, length,file_name, fastaFilePath) => {
    try {
        const response = await axiosConfig.post('/api/sample/createsample', 
            { name, header, length,file_name, fastaFilePath}, 
            {params: { user_id, experiment_id }}  
        );
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const apiGetSamplesByExperimentId = async (experiment_id) => {
    try {
        const response = await axiosConfig.get('/api/sample/getsamplesbyexperimentid', {
            params: { experiment_id }
        });
        return response.data;
    } catch (error) {
        throw error.message;
    }
};

export const apiDeleteSampleById = async (id) => {
    try {
      const response = await axiosConfig.delete('/api/sample/deletesample', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  };
  