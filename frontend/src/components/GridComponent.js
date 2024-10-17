import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './GridComponent.css';

const GridComponent = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className='grid'>
            <div className="grid_header">
                <h1>Photos</h1>
            </div>

            {/* Photo Grid using Material-UI ImageList */}
            <ImageList sx={{ width: '100%', height: 'auto', paddingLeft: '10px', paddingRight: '10px' }} cols={4} gap={0}>
                {images.map((ig, index) => (
                    ig.image && (
                        <ImageListItem key={index} onClick={() => openModal(ig.image)} className="image-container">
                            <img
                                src={`data:image/jpeg;base64,${ig.image}`}
                                alt={ig.group_name}
                                loading="lazy"
                                className="grid_image"
                            />
                            <div className="overlay">{ig.group_name}</div>
                        </ImageListItem>
                    )
                ))}
            </ImageList>

            {/* Modal for Image Preview */}
            {selectedImage && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={`data:image/jpeg;base64,${selectedImage}`} alt="Selected" />
                </div>
            )}
        </div>
    );
};

export default GridComponent;
