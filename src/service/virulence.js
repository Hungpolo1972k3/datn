import axiosConfig from "../axiosConfig"
export const apiGetVirulenceInfo = async (file, sample_id) => {
    try {
        const formData = new FormData();
        formData.append('fasta', file);

        const response = await axiosConfig.post(`/api/virulence/getvirulenceinfo?sample_id=${sample_id}`, formData, {
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

export const apiGetVirulencesBySampleId = async ( sample_id) => {
    try {
        const response = await axiosConfig.get(`/api/virulence/getvirulencesbysampleid?sample_id=${sample_id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const apiRunVirulenceTool = async (file) => {
    try {
        const formData = new FormData();
        formData.append('fasta', file);
        
        const response = await axiosConfig.post(`/api/virulence/runvirulencetool`, formData, {
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