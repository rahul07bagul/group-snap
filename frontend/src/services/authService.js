import api from '../api'; // Assuming axios instance is set up

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    // if(error.response.data.message === 'Invalid credentials'){
      
    // }
    console.error('Error logging in:', error.response.data.message);
    throw error;
  }
};
