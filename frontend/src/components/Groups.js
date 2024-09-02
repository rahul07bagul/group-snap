import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './Groups.css';
import GroupRow from './GroupRow';
import CreateGroupDialog from './CreateGroupDialog';
import JoinGroupDialog from './JoinGroupDialog';

function Groups() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);

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
    return (
        <div className="group">
            <div className='create_group'>
                <Button onClick={handleOpenCreateDialog}>
                    Create Group
                </Button>
                <Button onClick={handleOpenJoinDialog}>Join Group</Button>
            </div>

            <div className='groups'>
              <GroupRow/>
              <GroupRow/>
            </div>

            {/* Create Group Dialog */}
            <CreateGroupDialog open={openCreateDialog} onClose={handleCloseCreateDialog} />
        
            {/* Join Group Dialog */}
            <JoinGroupDialog open={openJoinDialog} onClose={handleCloseJoinDialog} />

        </div>
    );
}

export default Groups;
