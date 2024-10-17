import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import "./Dialog.css"; // You can create a common CSS file for both dialogs
import { useStateValue } from '../context/StateProvider';
import { createGroup } from '../services/groupService';

function CreateGroupDialog({ open, onClose, onGroupCreated }) {
  const [{ user }, dispatch] = useStateValue();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [groupCreated, setGroupCreated] = useState(false);
  const [groupImage, setGroupImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setGroupName("");
    setGroupDescription("");
    setShowInviteCode(false);
    setInviteCode("");
    setGroupCreated(false);
    setGroupImage(null);
    setImagePreviewUrl(null);
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
        },
      }}
    >
      <DialogTitle className="dialogTitle">Create a New Group</DialogTitle>

      <div className="imagePickerContainer">
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div className="imagePreviewContainer">
            <img
              src={
                imagePreviewUrl
                  ? imagePreviewUrl
                  : "https://via.placeholder.com/100" // Default image placeholder
              }
              alt="Group Preview"
              className="imagePreview"
            />
            <IconButton
              component="label"
              htmlFor="image-upload"
              className="imageUploadButton"
            >
              <PhotoCameraIcon />
            </IconButton>
          </div>
        </div>
        
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
          <DialogContentText className="inviteCode">
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
