import api from '../api';

// Fetch all use groups
export const getUserGroups = async (id) => {
  try {
    const response = await api.get(`/groups/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw error; 
  }
};

// Fetch all group members
export const getGroupMembers = async (id) => {
  try {
    const response = await api.get(`/groups/members/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group members:', error);
    throw error; 
  }
};

// Create Group
export const createGroup = async (groupName, groupDescription, userId) => {
  try {
    const response = await api.post('/groups/create', { groupName, groupDescription, userId });
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error; 
  }
};

// Join Group
export const joinGroup = async (inviteCode, userId) => {
  try {
    const response = await api.post('/groups/join', { inviteCode, userId });
    return response.data;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error; 
  }
};