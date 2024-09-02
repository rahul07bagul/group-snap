import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@material-ui/core';
import './Dialog.css';

function JoinGroupDialog({ open, onClose }) {
    const [groupCode, setGroupCode] = useState('');

    const handleJoinGroup = () => {
        console.log('Joining Group with Code:', groupCode);
        onClose(); // Close the dialog
    };

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: 'dialogPaper' }}>
            <DialogTitle className="dialogTitle">Join a Group</DialogTitle>
            <DialogContent className="dialogContent">
                <DialogContentText>
                    <div className="contentText">
                        Please enter the group code to join.
                    </div>
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Group Code"
                    fullWidth
                    variant="filled"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    className="textField"
                    placeholder="Enter group code"
                />
            </DialogContent>
            <DialogActions className="dialogActions">
                <Button onClick={onClose}  className="dialogButtons">
                    Cancel
                </Button>
                <Button onClick={handleJoinGroup}  className="dialogButtons">
                    Join
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default JoinGroupDialog;
