import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import PhotosIcon from '@material-ui/icons/Photo';
import SettingsIcon from '@material-ui/icons/Settings';
import LogOut from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { useUser, useUserProfilePicture } from '../hooks/useUser';

function Sidebar() {
  const { user } = useUser();
  const {profilePicture} = useUserProfilePicture();

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={`data:image/jpeg;base64,${profilePicture}`} alt={user.username} className="sidebar__userImage" />
        <h4 className="sidebar__userName poppins-light">{user.username}</h4>
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
      <Link to="/login">
        <SidebarRow Icon={LogOut} title="Log Out" />
      </Link>
    </div>
  );
}

export default Sidebar;
