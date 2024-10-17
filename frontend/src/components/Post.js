import React, { useState } from 'react';
import './Post.css';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deletePost } from '../services/postService';
import { useStateValue } from '../context/StateProvider';

function Post({ post, profilePic, image, handleDeleteRefresh }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [{ user }] = useStateValue();

    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);  // Close the menu
    };

    const handleDeletePost = async (event) => {
        await deletePost(post.post_id);
        handleDeleteRefresh(post.post_id);
    };

    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar" />

                <div className="post__topInfo">
                    <h4 className="post_font">{post.anonymous_name}</h4>
                    <p className='post_font'>{new Date(post.created_at).toUTCString()}</p> {/* Directly converting the timestamp */}
                </div>
                <MoreVertIcon className='post_options' onClick={handleOptionClick}></MoreVertIcon>

                {/* Menu for MoreVertIcon */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    classes={{ paper: 'customMenu' }}  // Apply the customMenu class
                >
                    {post.user_id === user.user.id ? (
                        <div>
                            <MenuItem onClick={handleMenuClose} className="customMenuItem">
                                Edit
                            </MenuItem>
                            <MenuItem onClick={(event) => handleDeletePost(event)} className="customMenuItem">
                                Delete
                            </MenuItem>
                        </div>
                    ) : (
                        <></>
                    )}
                    <MenuItem onClick={handleMenuClose} className="customMenuItem">
                        Report
                    </MenuItem>
                </Menu>

            </div>

            <div className="post__message post_font">
                <p>{post.caption}</p>
            </div>

            <div className="post__image">
                <img src={image} alt=""/>
            </div>

            <div className="post__options">
                <div className="post__option">
                    <ArrowUpward className="like2" />
                    <p className='post_font'>Vote</p>
                </div>

                <div className="post__option">
                    <ChatBubbleOutlineIcon />
                    <p className='post_font'>Comment</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
