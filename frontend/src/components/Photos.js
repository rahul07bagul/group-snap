import React, { useState, useEffect } from 'react';
import './Photos.css';
import GridComponent from './GridComponent';
import { useStateValue } from '../context/StateProvider';
import { fetchPhotos } from '../services/photosService';

function Photos() {
    const [{ user }] = useStateValue();
    const [photos, setPhotos] = useState([]);

    const getPhotos = async (userId) => {
        try {
            const response = await fetchPhotos(userId);
            setPhotos(response);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    useEffect(() => {
        if (user && user.user.id) {
            getPhotos(user.user.id);
        }
    }, [user]);

    return (
        <div className="photos">
            <GridComponent images={photos} />
        </div>
    );
}

export default Photos;
