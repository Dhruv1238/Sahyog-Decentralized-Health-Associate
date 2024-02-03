import { Typography } from '@material-tailwind/react'
import React from 'react'
import sosButtonImage from '../../assets/sos-but.png';
import Navbar from '../../components/Navbar';
import './SOS.css'
import { useState } from 'react';
import Appbar from '../../components/appbar/Appbar';

const SOS = () => {
    const [click, setClick] = useState(false);
    const sosClickHandler = () => {
        const phoneNumber = '1-800-891-4416'; // Replace with the actual phone number
        window.location.href = `tel:${phoneNumber}`;
    }


    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen main ' >
                <div className='sos-button'>
                    <img src={sosButtonImage} alt="Sos-button" className='scale-animation' onClick={sosClickHandler} />
                </div>
                <div className='bot-text'>
                    <Typography color='gray' >
                        "Remember we are just 1 click away"
                    </Typography>
                </div>
            </div>
            <Appbar />
        </>
    )
}

export default SOS
