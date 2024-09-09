import { useState, useEffect } from 'react';
import { getProfilePicture, getUser } from '../services/userService';

export const useUser = () => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userId = 1;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userId);
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);  // Empty dependency array means this will run once on component mount

  return { user, loading, error };
};

export const useUserProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = 1;
    useEffect(() => {
      const fetchUserProfilePicture = async () => {
        try {
          const data = await getProfilePicture(userId);
          setProfilePicture(data.image);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfilePicture();
    }, []);  // Empty dependency array means this will run once on component mount
  
    return { profilePicture, loading, error };
  };
