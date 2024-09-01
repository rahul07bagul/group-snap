import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import PhotosIcon from '@material-ui/icons/Photo';
import SettingsIcon from '@material-ui/icons/Settings';
import LogOut from '@material-ui/icons/ExitToApp'
import rahulImage from '../images/Rahul Main.JPG';

function Sidebar() {
    // Hardcoded user data
    const user = {
        displayName: 'Rahul Bagul',
        photoURL: rahulImage
    };

    return (
        <div className="sidebar">
            {/* <SidebarRow src={user.photoURL} title={user.displayName} /> */}

            <div className="sidebar__user">
                <img src={user.photoURL} alt={user.displayName} className="sidebar__userImage" />
                <h4 className="sidebar__userName poppins-light">{user.displayName}</h4>
            </div>

            <SidebarRow Icon={HomeIcon} title="Home" />
            <SidebarRow Icon={PeopleIcon} title="Groups" />
            <SidebarRow Icon={PhotosIcon} title="Photos" />
			<SidebarRow Icon={SettingsIcon} title="Settings" />
			<SidebarRow Icon={LogOut} title="Log Out"/>
            <br />
        </div>
    );
}

export default Sidebar;
