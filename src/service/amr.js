import axiosConfig from "../axiosConfig"
export const apiGetAmrInfo = async (file, sample_id) => {
    try {
        const formData = new FormData();
        formData.append('fasta', file);

        const response = await axiosConfig.post(`/api/amr/getamrinfo?sample_id=${sample_id}`, formData, {
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

export const apiGetAmrsBySampleId = async (sample_id) => {
    try {
        const response = await axiosConfig.get(`/api/amr/getamrsbysampleid?sample_id=${sample_id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
