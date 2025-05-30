import axiosConfig from "../axiosConfig"
export const apiUserLogin = async (data) => {
    try {
        const response = await axiosConfig.post('/api/user/login', data);
        return response.data;
    } catch (error) {
        throw error.message;
    }
};

export const apiGetUserById = async (token) => {
    try {
      const response = await axiosConfig.get("/api/user/getuserbyid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };

  
  export const apiUpdateUserById = async ( user_id, email, username, phone, address, birthday, gender, career, workplace) => {
    try {
      const response = await axiosConfig.put(
        `/api/user/updateuserinfo`,
        {
          email,
          username,
          phone,
          address,
          birthday,
          gender,
          career,
          workplace,
        },
        {
          params: { user_id },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
  
  export const apiAllUsers = async() => {
    try {
      const response = await axiosConfig.get("/api/user/getallusers");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };

  export const apiAddUser = async (formData) => {
    try {
      const response = await axiosConfig.post("/api/user/adduser", formData);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
  
  export const apiDeleteUser = async (id) => {
    try {
      const response = await axiosConfig.delete(`/api/user/deleteuser?id=${id}`);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
  
export const apiEditPassword = async (id, newpassword) => {
  try {
    const response = await axiosConfig.put(
      `/api/user/editpassword?user_id=${id}`,
      { newpassword }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

  