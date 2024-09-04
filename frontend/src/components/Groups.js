import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Groups.css';
import GroupRow from './GroupRow';
import CreateGroupDialog from './CreateGroupDialog';
import JoinGroupDialog from './JoinGroupDialog';
import GroupDetails from './GroupDetails';

function Groups() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleOpenJoinDialog = () => {
    setOpenJoinDialog(true);
  };

  const handleCloseJoinDialog = () => {
    setOpenJoinDialog(false);
  };

  const handleGroupClick = (groupName) => {
    navigate(`/groups/${groupName}`);
  };

  // Check if the current path is exactly '/groups'
  const isGroupsPath = location.pathname === '/groups';

  return (
    <div className="group">
      {isGroupsPath && (
        <>
          <div className='create_group'>
            <Button onClick={handleOpenCreateDialog}>
              Create Group
            </Button>
            <Button onClick={handleOpenJoinDialog}>Join Group</Button>
          </div>

          <div className='groups'>
            <GroupRow groupName="Purdue Friends" onClick={() => handleGroupClick("Purdue Friends")} />
            <GroupRow groupName="Roommates" onClick={() => handleGroupClick("Roommates")} />
          </div>

          {/* Create Group Dialog */}
          <CreateGroupDialog open={openCreateDialog} onClose={handleCloseCreateDialog} />

          {/* Join Group Dialog */}
          <JoinGroupDialog open={openJoinDialog} onClose={handleCloseJoinDialog} />
        </>
      )}

      {/* Route for individual group pages */}
      <Routes>
        <Route path="/:groupName" element={<GroupDetails />} />
      </Routes>
    </div>
  );
}

export default Groups;
