import React, { useState } from 'react';
import './MessageSender.css';
import { Button } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { Avatar } from '@material-ui/core';

function MessageSender() {
	// Hardcoded user information
	const user = {
		displayName: 'John Doe',
		photoURL: 'https://example.com/user-avatar.jpg'
	};

	const [input, setInput] = useState('');
	// const [imageUrl, setImageUrl] = useState('');

	// const handleSubmit = (e) => {
	// 	e.preventDefault(); // Preventing page refresh

	// 	// Simulate DB operations
	// 	console.log('Message:', input);
	// 	console.log('Image URL:', imageUrl);
	// 	console.log('User:', user.displayName, user.photoURL);

	// 	// Reset input fields after submission
	// 	setInput('');
	// 	setImageUrl('');
	// };

	return (
		<div className="messageSender">
			<div className="messageSender__top">
				<Avatar src={user.photoURL} />
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="messageSender__input"
						placeholder={`Write something...`}
					/>
				</form>
				<Button type='submit' className='messageSender_button' variant="text">Post</Button>
			</div>

			<div className="messageSender__bottom">
				<div className="messageSender__option">
					<VideocamIcon style={{ color: 'red' }} />
					<h3>Post Video</h3>
				</div>

				<div className="messageSender__option">
					<PhotoLibraryIcon style={{ color: '#27ae60' }} />
					<h3>Post Photo</h3>
				</div>
			</div>
		</div>
	);
}

export default MessageSender;
