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

function CreateGroupDialog({ open, onClose }) {
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = () => {
    console.log("Group Created:", groupName);
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: "dialogPaper" }}>
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
      </DialogContent>
      <DialogActions className="dialogActions">
        <Button onClick={onClose} className="dialogButtons">
          Cancel
        </Button>
        <Button onClick={handleCreateGroup} className="dialogButtons">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateGroupDialog;
