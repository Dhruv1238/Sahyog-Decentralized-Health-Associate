import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
const Intro = () => {
    const [userType, setUserType] = useState('')
    useEffect(() => {
        if (userType) {
            console.log(userType)
        }
    })
    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center w-full gap-10 font-inter text-color1'>
                <p className="text-2xl text-color1">Are you a Patient or a Doctor??</p>
                <div className='flex items-center justify-between w-full'>
                    <Button color="blue" size="lg" ripple="light" onClick={() => setUserType("Patient")}>Patient</Button>
                    <Button color="blue" size="lg" ripple="light" onClick={() => setUserType("Doctor")}>Doctor</Button>
                </div>
            </div>
        </div>
    )
}

export default Intro