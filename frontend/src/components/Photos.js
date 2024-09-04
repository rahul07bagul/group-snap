import React from 'react';
import './Photos.css';
import GridComponent from './GridComponent';
import rahulImage from '../images/Rahul Main.JPG';
import rahulImage2 from '../images/rahulImage2.jpg'

const images = [
    { url: rahulImage, title: 'Rahul Main' },
    { url: rahulImage2, title: 'Rahul Again' },
    { url: rahulImage, title: 'Another Image' },
    { url: rahulImage2, title: 'Another One' },
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
