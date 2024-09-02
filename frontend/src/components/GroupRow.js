import React from 'react';
import './GroupRow.css';
import rahulImage from '../images/best-freinds.jpg';

function GroupRow() {
    return (
        <div className="groupRow">
            <img src={rahulImage} alt='groupImg' className="groupImg" />
            <div className='poppins_font groupName'>Friends Forever</div>
        </div> 
    )
}

export default GroupRow;