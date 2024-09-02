import React from 'react';
import './Groups.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GroupRow from './GroupRow';


// For v4:
const useStyles = makeStyles({
  root: {
    '& .MuiButton-label': {
      fontFamily: 'Poppins, sans-serif',
    },
  },
});

function Groups() {
    const classes = useStyles();
    return (
        <div className="group">
            <div className='create_group'>
                <Button className={classes.root}>Create Group</Button>
                <Button className={classes.root}>Join Group</Button>
            </div>

            <div className='groups'>
                <GroupRow/>
                <GroupRow/>
            </div>
        </div>
    );
}

export default Groups;
