import api from '../api';

// Create Post
export const createPost = async (formData) => {
  try {
    const response = await api.post('/posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

//Get Posts
export const fetchPosts = async (groupId) => {
  try {
    const response = await api.get(`/posts/fetch/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

//Get Posts
export const fetchAllPosts = async (userId) => {
  try {
    const response = await api.get(`/posts/fetch/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};