import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router'
import { Interaction } from '../components/contract/Interaction'

const Intro = () => {
    const { userDetails, userType, setUserType } = useContext(Interaction);
    console.log(userDetails)
    const navigate = useNavigate()
    const handlePatient = () => {
        setUserType('Patient')
        console.log(userType)
        navigate('/details')
    }
    const handleDoctor = () => {
        setUserType('Doctor')
        console.log(userType)
        navigate('/landing')
    }
    useEffect(() => {
        if (userDetails && userDetails[2] !== "") {
            navigate('/landing')
        }
    }, [userDetails])
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center w-full gap-20 font-inter text-color1'>
                <p className="text-2xl text-color1">Are you a Patient or a Doctor??</p>
                <div className='flex items-center justify-center w-full gap-10'>
                    <Button color="blue" size="lg" ripple="light" onClick={handlePatient}>Patient</Button>
                    <Button color="blue" size="lg" ripple="light" onClick={handleDoctor}>Doctor</Button>
                </div>
            </div>
        </div>
    )
}

export default Intro