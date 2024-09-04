import React from 'react';
import './GroupRow.css';
import groupImg from '../images/groupImg.jpg';

function GroupRow({ groupName, onClick }) {
  return (
    <div className="groupRow" onClick={onClick}>
      <img src={groupImg} alt='groupImg' className="groupImg" />
      <div className='poppins_font groupName'>{groupName}</div>
    </div>
  );
}

export default GroupRow;
