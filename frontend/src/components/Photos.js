import React from 'react';
import './Photos.css';
import GridComponent from './GridComponent';
import rahulImage from '../images/Rahul Main.JPG';

const images = [
    { url: rahulImage, title: 'Rahul Main' },
    { url: rahulImage, title: 'Rahul Again' },
    { url: rahulImage, title: 'Another Image' },
    { url: rahulImage, title: 'Another One' },
    // Add more images as needed
];

function Photos() {
    return (
        <div className="photos">
            <GridComponent images={images} />
        </div>
    );
}

export default Photos;
