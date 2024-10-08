import React from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

function Post({ profilePic, image, username, timestamp, message }) {
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar" />

                <div className="post__topInfo">
                    <h4 className="post_font">{username}</h4>
                    <p className='post_font'>{new Date(timestamp).toUTCString()}</p> {/* Directly converting the timestamp */}
                </div>
            </div>

            <div className="post__message post_font">
                <p>{message}</p>
            </div>

            <div className="post__image">
                <img src={image} alt="" />
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
