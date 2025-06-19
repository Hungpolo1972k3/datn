import axiosConfig from "../axiosConfig"

export const apiRunBlastnTool = async (file, id) => {
  try {
    const formData = new FormData();
    formData.append('fasta', file);

    const response = await axiosConfig.post(`/api/blastn/runblastntool/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const apiGetZipFile = async (id) => {
  try {
    const response = await axiosConfig.get('/api/dataset/getzipfile', {
      params: { id } 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const apiRunBlastnTwoFiles = async (subUrl, queryUrl) => {
  try {
    const response = await axiosConfig.post('/api/blastn/blastn', {
      subUrl,
      queryUrl
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const apiGetBlastnInfo = async (code) => {
  try {
    const response = await axiosConfig.get('/api/blastn/getblastnbycode',{
      params: { code },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const apiDownloadFile = async (filePath) => {
    try {
      const response = await axiosConfig.get('api/blastn/downloadfile', {
        params: { path: filePath },
        responseType: 'blob', 
      });
  
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop();
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

export const apiGetFileInfo2 = async (filePath) => {
  try {
    const response = await axiosConfig.get('/api/blastn/getfileinfo', {
      params: { path: filePath },
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const apiGetAllBlastn = async () => {
  try {
    const response = await axiosConfig.get('/api/blastn/getallblastn');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};