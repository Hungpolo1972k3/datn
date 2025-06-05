import axiosConfig from "../axiosConfig"
export const apiEditPassword = async (id, newpassword) => {
  try {
    const response = await axiosConfig.put(
      `/api/admin/editpassword?user_id=${id}`,
      { newpassword }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const apiDeleteUser = async (id) => {
    try {
      const response = await axiosConfig.delete(`/api/admin/deleteuser?id=${id}`);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
export const apiAddUser = async (formData) => {
    try {
      const response = await axiosConfig.post("/api/admin/adduser", formData);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
export const apiAllUsers = async() => {
    try {
      const response = await axiosConfig.get("/api/admin/getallusers");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };