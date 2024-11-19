import axios from "axios";

export const deletePost = (id) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/api/delete_function`, {
    id: id
  });
};

export const deleteoffice = (id) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/api/office_delete`, {
    id: id
  });
};
export const updateOffice = async (id, update) => {
  try {
    const response = await axios.post(
     `${import.meta.env.VITE_BASE_URL}/api/update_office`, 
      { 
        id, // id passed directly 
        ...update // spread the update object
      }
    );
    return response;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};


export const deleterole= (id) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/api/delete_role_master`, {
    id: id
  });
};

export const updateRole= async (id, update) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/update_role`, 
      { 
        id, // id passed directly 
        ...update // spread the update object
      }
    );
    return response;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export const updatefunmas= async (id, update) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/update_function`, 
      { 
        id, // id passed directly 
        ...update // spread the update object
      }
    );
    return response;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export const updateUser= async (id, update) => {
  try {
    const response = await axios.post(
      `
      ${import.meta.env.VITE_BASE_URL}/api/update_user`, 
      { 
        id, // id passed directly 
        ...update // spread the update object
      }
    );
    return response;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};
export const userDelete= (id) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/api/user_delete`, {
    id: id
  });
};