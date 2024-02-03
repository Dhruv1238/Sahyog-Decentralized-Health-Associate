import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router'
const Intro = () => {
    const [userType, setUserType] = useState('')
    useEffect(() => {
        if (userType) {
            console.log(userType)
        }
    })
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center w-full gap-20 font-inter text-color1'>
                <p className="text-2xl text-color1">Are you a Patient or a Doctor??</p>
                <div className='flex items-center justify-center gap-10 w-full'>
                    <Button color="blue" size="lg" ripple="light" onClick={() => navigate('/details')}>Patient</Button>
                    <Button color="blue" size="lg" ripple="light" onClick={() => setUserType("Doctor")}>Doctor</Button>
                </div>
            </div>
        </div>
    )
}

export default Intro