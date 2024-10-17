import api from '../api';

export const fetchPhotos = async (userId) => {
    try {
      const response = await api.get(`/photos/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  };