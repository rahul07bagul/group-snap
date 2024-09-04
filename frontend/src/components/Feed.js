import React, { useState } from 'react';
import './Feed.css';
import Post from './Post';
import rahulImage from '../images/Rahul Main.JPG';
import rahulImage2 from '../images/rahulImage2.jpg'
import WritePost from './MessageSender';
import groupImg from '../images/groupImg.jpg';
import shreyas from '../images/shreyas.JPG';
import deep from '../images/deep.JPG';
import sup from '../images/sup.JPG';

function Feed() {
    // Hardcoded posts data
    const [posts, setPosts] = useState([
        {
            id: '1',
            data: {
                profilePic: 'https://example.com/profile-pic1.jpg',
                message: 'Hrishi',
                timestamp: '2024-08-30T12:00:00Z',
                username: 'dasdsadd',
                image: rahulImage2,
            },
        },
        {
            id: '2',
            data: {
                profilePic: 'https://example.com/profile-pic2.jpg',
                message: 'Euuuuuuuuu',
                timestamp: '2024-08-29T08:30:00Z',
                username: 'dsadsadasd',
                image: shreyas,
            },
        },
        {
            id: '3',
            data: {
                profilePic: 'https://example.com/profile-pic2.jpg',  // Using the rahulImage
                message: 'Gujju Chokhro',
                timestamp: '2024-08-28T09:15:00Z',
                username: 'hgfhfghfg',
                image: deep,
            },
        },
		{
            id: '4',
            data: {
                profilePic: 'https://example.com/profile-pic2.jpg',  // Using the rahulImage
                message: 'Network Engineer',
                timestamp: '2024-08-28T09:15:00Z',
                username: 'jhgjghjghj',
                image: sup,
            },
        },
		{
            id: '5',
            data: {
                profilePic: 'https://example.com/profile-pic2.jpg',  // Using the rahulImage
                message: 'Boysss',
                timestamp: '2024-08-28T09:15:00Z',
                username: 'lkjlkjljk',
                image: groupImg,
            },
        },
    ]);

    return (
        <div className="feed">
            <WritePost/>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    profilePic={post.data.profilePic}
                    message={post.data.message}
                    timestamp={post.data.timestamp}
                    username={post.data.username}
                    image={post.data.image}
                />
            ))}
        </div>
    );
}

export default Feed;
