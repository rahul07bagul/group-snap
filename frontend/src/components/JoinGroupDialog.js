import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@material-ui/core';
import './Dialog.css';
import { joinGroup } from '../services/groupService';
import { useStateValue } from '../context/StateProvider';

function JoinGroupDialog({ open, onClose }) {
    const [groupCode, setGroupCode] = useState('');
    const [{ user }] = useStateValue();

    const handleJoinGroup = async () => {
        try{
            const response = await joinGroup(groupCode, user.user_id);
            console.log('Joined Group', response.message);
            onClose(); // Close the dialog
        }catch (error) {
            console.error('Error joining group:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: 'dialogPaper' }} PaperProps={{
            style: {
                position: 'absolute',
                // left: '44%', // Adjust left position
                width: '25%',
            },
        }}>
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
                <Button onClick={onClose} className="dialogButtons">
                    Cancel
                </Button>
                <Button onClick={handleJoinGroup} className="dialogButtons">
                    Join
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default JoinGroupDialog;
