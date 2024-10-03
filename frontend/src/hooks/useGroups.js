import { useState, useEffect } from 'react';
import { getUserGroups } from '../services/groupService';
import { useStateValue } from '../context/StateProvider';

export const useGroups = () => {
  const [{ user }] = useStateValue();
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = user.user.id;

  // Function to fetch user groups
  const fetchUserGroups = async () => {
    setLoading(true);
    try {
      const data = await getUserGroups(userId);
      setUserGroups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user groups when the component mounts
  useEffect(() => {
    fetchUserGroups();
  }, []);  // Empty dependency array means this will run once on component mount

  return { userGroups, loading, error, fetchUserGroups };  // Return fetchUserGroups to use it outside the hook
};
