import api from '../api';

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;  // You can also handle error logging here
  }
};

export const getUser = async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;  // Handle error logging or reporting
    }
  };

export const getProfilePicture = async (id) => {
  try {
    const response = await api.get(`/users/profile_image/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    throw error;  // You can also handle error logging here
  }
};

// // Example: Create a new user
// export const createUser = async (userData) => {
//   try {
//     const response = await api.post('/users', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error;
//   }
// };
