import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './GroupDetails.css';
import groupImg from '../images/best-freinds.jpg';
import Feed from './Feed';
import GroupMembers from './GroupMembers';
import Photos from './Photos';

function GroupDetails() {
    const { groupName } = useParams();
    const navigate = useNavigate();  // Use useNavigate instead of useHistory
    const [tabIndex, setTabIndex] = useState(0);

    const handleBackClick = () => {
        navigate(-1);  // Go back to the previous page
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const members = [
        {
            id: 1,
            username: 'Rahul',
            profilePic: 'https://example.com/rahul-avatar.jpg',
        },
        {
            id: 2,
            username: 'John',
            profilePic: 'https://example.com/john-avatar.jpg',
        },
        {
            id: 3,
            username: 'Sara',
            profilePic: 'https://example.com/sara-avatar.jpg',
        },
        // Add more members here
    ];

    return (
        <div className="group-details">
            <div className='group-header'>
                <ArrowBackIcon className="back-button" onClick={handleBackClick} />
                <div className="cover-photo">
                    <img src={groupImg} alt={`${groupName} cover`} />
                </div>
                <div className='group-name'>
                    <h2>{groupName}</h2>
                    <h4>30 Members</h4>
                </div>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    centered
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: '#b4b2b2', // Customize the indicator color when selected
                        },
                    }}>
                    <Tab label="Feed" sx={{
                        color: '#b4b2b2',
                        '&.Mui-selected': {
                            color: '#b4b2b2',
                        },
                    }} />
                    <Tab label="Members" sx={{
                        color: '#b4b2b2',
                        '&.Mui-selected': {
                            color: '#b4b2b2',
                        },
                    }} />
                    <Tab label="Media" sx={{
                        color: '#b4b2b2',
                        '&.Mui-selected': {
                            color: '#b4b2b2',
                        },
                    }} />
                    <Tab label="About" sx={{
                        color: '#b4b2b2',
                        '&.Mui-selected': {
                            color: '#b4b2b2',
                        },
                    }} />
                </Tabs>

            </div>

            <div className="content">
                {tabIndex === 0 && <div> <Feed /></div>}
                {tabIndex === 1 &&
                    <div className='feed' >
                        {members.map((member) => (
                            <GroupMembers
                                key={member.id}
                                profilePic={member.profilePic}
                                username={member.username}
                            />
                        ))}
                    </div>}
                {tabIndex === 2 && <div><Photos /></div>}
                {tabIndex === 3 && 
                <div className='feed'>
                    <div className='about'>
                        <div className='about_header'>About this group</div>
                        <div className='about_content'>
                            <p>Friends Group.</p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default GroupDetails;
