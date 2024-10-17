import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Groups.css';
import GroupRow from './GroupRow';
import CreateGroupDialog from './CreateGroupDialog';
import JoinGroupDialog from './JoinGroupDialog';
import GroupDetails from './GroupDetails';
import { useGroups } from '../hooks/useGroups';

function Groups() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Use custom hook to fetch groups
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { userGroups } = useGroups(refreshTrigger);

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

  const handleGroupClick = (group) => {
    navigate(`/groups/${group.group_name}`, { state: { group } });  // Pass the group object in the state
  };

  const handleGroupCreated = async () => {
    //await fetchUserGroups();  // Refresh the group list after creating a group
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleJoinGroup = async () => {
    //await fetchUserGroups();  // Refresh the group list after joining a group
    setRefreshTrigger((prev) => prev + 1);
  }

  const handleGroupDeleted = () => {
    setRefreshTrigger((prev) => prev + 1);
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
            {userGroups.length > 0 ? (
              userGroups.map((group) => (
                <GroupRow
                  key={group.group_id}
                  groupName={group.group_name}
                  onClick={() => handleGroupClick(group)}
                />
              ))
            ) : (
              <div>No groups available</div>
            )}
          </div>

          {/* Create Group Dialog */}
          <CreateGroupDialog open={openCreateDialog} onGroupCreated={handleGroupCreated} onClose={handleCloseCreateDialog} />

          {/* Join Group Dialog */}
          <JoinGroupDialog open={openJoinDialog} onGroupJoined={handleJoinGroup} onClose={handleCloseJoinDialog} />
        </>
      )}

      {/* Route for individual group pages */}
      <Routes>
      <Route path="/:groupName" element={<GroupDetails onGroupDeleted={handleGroupDeleted} />} />
      </Routes>
    </div>
  );
}

export default Groups;
