import React from 'react';
import './GroupRow.css';
import rahulImage from '../images/best-freinds.jpg';

function GroupRow({ groupName, onClick }) {
  return (
    <div className="groupRow" onClick={onClick}>
      <img src={rahulImage} alt='groupImg' className="groupImg" />
      <div className='poppins_font groupName'>{groupName}</div>
    </div>
  );
}

export default GroupRow;
