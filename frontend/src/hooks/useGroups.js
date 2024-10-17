import { useState, useEffect } from 'react';
import { getUserGroups } from '../services/groupService';
import { useStateValue } from '../context/StateProvider';

export const useGroups = (refreshTrigger) => {
  const [{ user }] = useStateValue();
  const [userGroups, setUserGroups] = useState(() => {
    // Try to load user groups from localStorage when component mounts
    const storedGroups = localStorage.getItem('userGroups');
    return storedGroups ? JSON.parse(storedGroups) : [];
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = user?.user.id;

  // Function to fetch user groups
  const fetchUserGroups = async () => {
    setLoading(true);
    try {
      const data = await getUserGroups(userId);
      setUserGroups(data);
      localStorage.setItem('userGroups', JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user groups when the component mounts
  useEffect(() => {
    if (userId) {
      // Check if we already have user groups in localStorage
      const storedGroups = localStorage.getItem('userGroups');
      if (storedGroups) {
        setUserGroups(JSON.parse(storedGroups));
        setLoading(false);
      } else {
        fetchUserGroups();
      }
    }
  }, [refreshTrigger, userId]);

  return { userGroups, loading, error, fetchUserGroups };  // Return fetchUserGroups to use it outside the hook
};
