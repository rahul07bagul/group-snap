import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import "./Dialog.css"; // You can create a common CSS file for both dialogs
import { useStateValue } from '../context/StateProvider';
import { createGroup } from '../services/groupService';

function CreateGroupDialog({ open, onClose, onGroupCreated }) {
  const [{ user }, dispatch] = useStateValue()
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [groupCreated, setGroupCreated] = useState(false);

  const handleCreateGroup = async () => {
    try {
      const response = await createGroup(groupName, groupDescription, user.user.id);
      setInviteCode(response.group.invite_code); 
      setShowInviteCode(true);
      setGroupCreated(true);
      console.log("Group Created:", response);
      onGroupCreated();
    } catch (error) {
      console.error('Error creating group:', error);
      // You can show an error message to the user if needed
    }
  };

  const handleClose = () => {
    setGroupName("");
    setGroupDescription("");
    setShowInviteCode(false);
    setInviteCode("");
    setGroupCreated(false);
    onClose(); 
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: "dialogPaper" }}
      PaperProps={{
        style: {
          position: 'absolute',
          // left: '40%', // Adjust left position
          // transform: 'translate(-30%, -20%)',
        },
      }}
    >
      <DialogTitle className="dialogTitle">Create a New Group</DialogTitle>
      <DialogContent className="dialogContent">
        <DialogContentText>
          <div className="contentText">
            Please enter the name of the new group you want to create.
          </div>
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Group Name"
          variant="filled"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="textField"
        />
        <TextField
          margin="dense"
          label="Group Description"
          variant="filled"
          fullWidth
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          className="textField"
        />

      {showInviteCode && 
        <DialogContentText class="inviteCode">
        Here’s the invite code for your group. Share it with others to let them join.
        You can also find this code later in the group's About section.
        <br />
        <h3>Invite Code: {inviteCode}</h3>
      </DialogContentText>
      }
      </DialogContent>

      
        {groupCreated ? (
          <DialogActions className="dialogActions">
            <Button onClick={handleClose} className="dialogButtons">
              Close
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="dialogActions">
            <Button onClick={handleClose} className="dialogButtons">
              Cancel
            </Button>
            <Button onClick={handleCreateGroup} className="dialogButtons">
              Create
            </Button>
          </DialogActions>
        )}
      
    </Dialog>
  );
}

export default CreateGroupDialog;
