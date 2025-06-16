import axiosConfig from "../axiosConfig"

export const apiDownloadFolder = async (relativePath) => {
    try {
      const response = await axiosConfig.get('/api/dataset/downloadfolder', {
        params: { path: relativePath },
        responseType: 'blob' 
      });
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${relativePath.split('/').pop()}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw error;
    }
  };
  
export const apiGetFolderInfo = async (relativePath) => {
  try {
    const response = await axiosConfig.get('/api/dataset/getfolderinfo', {
      params: { path: relativePath }, 
    });
    return response.data; 
  } catch (error) {
    throw error;  
  }
};


export const apiDownloadFile = async (filePath) => {
    try {
      const response = await axiosConfig.get('api/dataset/downloadfile', {
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

export const apiGetFileInfo = async (relativePath) => {
  try {
    const response = await axiosConfig.get('/api/dataset/getfileinfo', {
      params: { path: relativePath }, 
    });
    return response.data; 
  } catch (error) {
    throw error;  
  }
};

export const apiGetZipFile2 = async (id) => {
  try {
    const response = await axiosConfig.get('/api/dataset/getzipfile2', {
      params: { id } 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}