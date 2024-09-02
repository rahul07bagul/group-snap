import React, { useState } from 'react';
import './GridComponent.css';

const GridComponent = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [columnStyle] = useState({ flex: '25%' });

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            {/* Photo Grid */}
            <div className='grid'>
                <div className="grid_header">
                    <h1>Photos</h1>
                </div>
                <div className="row">
                    {images.map((image, index) => (
                        <div key={index} className="column" style={columnStyle}>
                            <div className="image-container">
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className='grid_image'
                                    onClick={() => openModal(image.url)}
                                />
                                <div className="overlay">{image.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Image Preview */}
            {selectedImage && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={selectedImage} alt="Selected" />
                </div>
            )}
        </div>
    );
};

export default GridComponent;
