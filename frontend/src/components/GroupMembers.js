import React from 'react';
import './GroupMembers.css';
import { Avatar } from '@material-ui/core';

function GroupMembers({ profilePic, username }) {
    return (
        <div className="member">
            <div className="member__top">
                <Avatar src={profilePic} className="member__avatar" />

                <div className="member__topInfo">
                    <h4 className="member_font">{username}</h4>
                </div>
            </div>
        </div>
    );
}

export default GroupMembers;
