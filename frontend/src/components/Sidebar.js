import React, {useEffect } from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import PhotosIcon from '@material-ui/icons/Photo';
import SettingsIcon from '@material-ui/icons/Settings';
import LogOut from '@material-ui/icons/ExitToApp';
import { Link, useNavigate  } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { getProfilePicture } from '../services/userService';
import { actionTypes } from '../context/reducer';

function Sidebar({ onLogout }) {
  const [{ user, profilePicture, error }, dispatch] = useStateValue()
  const navigate = useNavigate ();
  
  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user && user.user.id && !profilePicture) { // Fetch only if profilePicture is null
        try {
          const data = await getProfilePicture(user.user.id); // Fetch profile picture
          dispatch({
            type: actionTypes.SET_PROFILE_IMAGE,
            profilePicture: data.image,
          });
        } catch (err) {
          dispatch({
            type: actionTypes.SET_PROFILE_ERROR,
            error: err.message,
          });
        }
      }
    };

    fetchProfilePicture(); // Call the function to fetch the profile picture
  }, [user, profilePicture, dispatch]);

  // Handle Logout
  const handleLogout = () => {
    onLogout();  // Call the onLogout function passed as a prop
    navigate('/login'); // Redirect to login after logout
  };

  if (!user) {
    return <div>Loading Sidebar...</div>; // Handle undefined state
  }

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={`data:image/jpeg;base64,${profilePicture}`} alt={user.user.username} className="sidebar__userImage" />
        <h4 className="sidebar__userName poppins-light">{user.user.username}</h4>
      </div>

      <Link to="/home">
        <SidebarRow Icon={HomeIcon} title="Home" />
      </Link>
      <Link to="/groups">
        <SidebarRow Icon={PeopleIcon} title="Groups" />
      </Link>
      <Link to="/photos">
        <SidebarRow Icon={PhotosIcon} title="Photos" />
      </Link>
      <Link to="/settings">
        <SidebarRow Icon={SettingsIcon} title="Settings" />
      </Link>
      {/* <Link to="/login">
        <SidebarRow Icon={LogOut} title="Log Out" />
      </Link> */}
       <div onClick={handleLogout}>
        <SidebarRow Icon={LogOut} title="Log Out" />
      </div>
    </div>
  );
}

export default Sidebar;
