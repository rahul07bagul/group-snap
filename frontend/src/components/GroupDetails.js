import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from '@material-ui/core';
import './GroupDetails.css';
import Feed from './Feed';
import GroupMembers from './GroupMembers';
import Photos from './Photos';
import groupImg from '../images/groupImg.jpg';
import { getGroupMembers } from '../services/groupService';

function GroupDetails() {
    const { groupName } = useParams();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [members, setMembers] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const location = useLocation();
    const group = location.state?.group;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    // Fetch group members when the component mounts
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getGroupMembers(group.group_id);
                setMembers(membersData);
                setLoading(false);       
            } catch (err) {
                setError(err.message);  
                setLoading(false);
            }
        };

        fetchMembers(); 
    }, [group.group_id]);

    // Conditional rendering for loading and error states
    if (loading) {
        return <div>Loading members...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="group-details">
            <div className='group-header'>
                <ArrowBackIcon className="back-button" onClick={handleBackClick} />
                <div className="cover-photo">
                    <img src={groupImg} alt={`${groupName} cover`} />
                </div>
                <div className='group-name'>
                    <h2>{groupName}</h2>
                    <h4>{members.length} Members</h4>
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
                {tabIndex === 0 && <div><Feed group={group} page='group'/></div>}
                {tabIndex === 1 && (
                    <div className='feed'>
                        {members.map((member) => (
                            <GroupMembers
                                key={member.user_id}
                                profilePic={member.profilePic || 'default.jpg'}  // Replace with actual profilePic from API if available
                                username={member.username}
                            />
                        ))}
                    </div>
                )}
                {tabIndex === 2 && <div><Photos /></div>}
                {tabIndex === 3 && (
                    <div className='feed'>
                        <div className='about'>
                            <div className='about_header'>About this group</div>
                            <div className='about_content'>
                                <p>Description: <br></br>{group.description}</p>
                                <div className='inviteCode'>
                                    <h3>Invite Code: {group.invite_code}</h3>
                                </div>
                                <div className='delete-group'>
                                    <Button>
                                        Delete Group
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupDetails;
