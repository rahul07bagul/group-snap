import React, { useState } from 'react';
import './Feed.css';
import Post from './Post';
import rahulImage from '../images/Rahul Main.JPG';
import rahulImage2 from '../images/rahulImage2.jpg'
import WritePost from './MessageSender';

function Feed() {
    // Hardcoded posts data
    const [posts, setPosts] = useState([
        {
            id: '1',
            data: {
                profilePic: 'https://example.com/profile-pic1.jpg',
                message: 'This is the first post!',
                timestamp: '2024-08-30T12:00:00Z',
                username: 'John Doe',
                image: rahulImage2,
            },
        },
        {
            id: '2',
            data: {
                profilePic: 'https://example.com/profile-pic2.jpg',
                message: 'Another day, another post!',
                timestamp: '2024-08-29T08:30:00Z',
                username: 'Jane Smith',
                image: rahulImage,
            },
        },
        {
            id: '3',
            data: {
                profilePic: rahulImage,  // Using the rahulImage
                message: 'Loving the new React features!',
                timestamp: '2024-08-28T09:15:00Z',
                username: 'Rahul Bagul',
                image: rahulImage2,
            },
        },
		{
            id: '4',
            data: {
                profilePic: rahulImage,  // Using the rahulImage
                message: 'Loving the new React features!',
                timestamp: '2024-08-28T09:15:00Z',
                username: 'Rahul Bagul',
                image: 'https://example.com/post-image3.jpg',
            },
        },
		{
            id: '5',
            data: {
                profilePic: rahulImage,  // Using the rahulImage
                message: 'Loving the new React features!',
                timestamp: '2024-08-28T09:15:00Z',
                username: 'Rahul Bagul',
                image: 'https://example.com/post-image3.jpg',
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
