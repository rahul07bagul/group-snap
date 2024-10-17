import React, { useState } from 'react';
import './MessageSender.css';
import { Button } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../context/StateProvider';
import { createPost } from '../services/postService';

function MessageSender({groupId, onPostCreated }) {
	const [{ user, profilePicture }] = useStateValue();

	const [caption, setCaption] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	// console.log(groupId);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);

		// Create a preview URL for the selected image
		if (file) {
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
    	formData.append('message', caption);
    	formData.append('file', selectedFile);
		formData.append('groupId', groupId);
		formData.append('userId', user.user.id);

		console.log('formData ' + JSON.stringify(formData));

		try {
			// POST the data to your backend API
			const response = await createPost(formData);
			console.log('Response from server:', response);
	  
			// Clear the form after successful submission
			setCaption('');
			setSelectedFile(null);
			setPreviewUrl(null);
			onPostCreated();
		  } catch (error) {
			console.error('Error uploading the file', error);
		  }
		};
	return (
		<div className="messageSender">
			<div className="messageSender__top">
				<Avatar src={`data:image/jpeg;base64,${profilePicture}`} />
				<form>
					<input
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						className="messageSender__input"
						placeholder={`Write something...`}
					/>
				</form>
				<Button type="submit" onClick={handleSubmit} className='messageSender_button' variant="text">Post</Button>
			</div>

			{/* Image Preview */}
			{previewUrl && (
				<div className="messageSender__imagePreview">
					<img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
				</div>
			)}

			<div className="messageSender__bottom">
				<div className="messageSender__option">
					<VideocamIcon style={{ color: 'red' }} />
					<h3>Video</h3>
				</div>

				<div className="messageSender__option">
					<label htmlFor="fileInput" className="messageSender__fileUpload">
						<PhotoLibraryIcon style={{ color: '#27ae60' }} />
						<h3>Photo</h3>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: 'none' }}
						onChange={handleFileChange}
						accept="image/*"
					/>
				</div>
			</div>
		</div>
	);
}

export default MessageSender;
