import axiosConfig from "../axiosConfig"
export const apiGetPlasmidInfo = async (file) => {
    try {
        const formData = new FormData();
        formData.append('fasta', file);

        const response = await axiosConfig.post('/api/plasmid/getplasmidinfo', formData, {
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
