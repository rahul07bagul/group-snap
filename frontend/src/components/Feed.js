import React, { useState, useEffect } from 'react';
import './Feed.css';
import Post from './Post';
import { fetchPosts, fetchAllPosts } from '../services/postService';
import WritePost from './MessageSender';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

function Feed({ group, page }) {
    const [posts, setPosts] = useState([]);
    const [{ user, allPosts, groupPosts }, dispatch] = useStateValue();

    // Function to update group posts in the local and global state
    const updateGroupPosts = async (groupId) => {
        try {
            const response = await fetchPosts(groupId);
            setPosts(response);
            dispatch({
                type: actionTypes.SET_GROUP_POSTS,
                groupId: groupId,
                posts: response,
            });

            // Update allPosts to include the newly fetched group posts
            updateAllPosts(response);
        } catch (error) {
            console.error('Error updating group posts:', error);
        }
    };

    // Function to update all posts in the global state
    const updateAllPosts = (newPosts) => {
        if (allPosts) {
            const updatedAllPosts = [...newPosts, ...allPosts].filter(
                (post, index, self) =>
                    index === self.findIndex((p) => p.post_id === post.post_id)
            );
            dispatch({
                type: actionTypes.SET_ALL_POSTS,
                allPosts: updatedAllPosts,
            });
        }
    };

    // Function to get posts from cache or fetch them if not available
    const getPostsFromCacheOrFetch = async () => {
        if (page === 'group' && group && group.group_id) {
            if (groupPosts[group.group_id]) {
                setPosts(groupPosts[group.group_id]); // Use cached posts
            } else {
                await updateGroupPosts(group.group_id); // Fetch fresh posts
            }
        } else if (page === 'home') {
            if (allPosts) {
                setPosts(allPosts); // Use cached posts
            } else {
                try {
                    const response = await fetchAllPosts(user.user.id);
                    setPosts(response);
                    dispatch({
                        type: actionTypes.SET_ALL_POSTS,
                        allPosts: response,
                    });
                } catch (error) {
                    console.error('Error fetching all posts:', error);
                }
            }
        }
    };

    // Effect to get posts based on the page and group
    useEffect(() => {
        getPostsFromCacheOrFetch();
    }, [group, page, user, allPosts, groupPosts, dispatch]);

    // Handle adding a new post by refreshing group posts or all posts
    const handlePostCreated = () => {
        if (page === 'group' && group && group.group_id) {
            updateGroupPosts(group.group_id); // Refresh group posts after new post
        } else if (page === 'home') {
            // Refresh all posts after new post
            updateAllPosts(posts);
        }
    };

    return (
        <div className="feed">
            {/* WritePost component with a callback to refresh posts after posting */}
            {page === 'group' ? (
                <WritePost groupId={group.group_id} onPostCreated={handlePostCreated} />
            ) : (
                <></>
            )}

            {/* Display fetched posts */}
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post.post_id}
                        profilePic={post.profilePic || 'https://example.com/default-profile.jpg'}
                        message={post.caption}
                        timestamp={post.created_at}
                        username={post.anonymous_name || 'Anonymous'}
                        image={post.image ? `data:image/jpeg;base64,${post.image}` : null}
                    />
                ))
            ) : (
                <div className='noPost'>
                    <p>No posts to display</p>
                </div>
            )}
        </div>
    );
}

export default Feed;
