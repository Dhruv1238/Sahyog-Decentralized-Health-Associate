import React, { useEffect, useState } from 'react';
import icon from '../assets/user-icon.png'
import { Typography } from '@material-tailwind/react';
import { CiBellOn } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { useAuth } from '@arcana/auth-react'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const [clicked, setClicked] = useState(false);
    const clickHandler = () => {
        setClicked(!clicked);
        console.log('clicked')
    }

    const { user } = useAuth();

    // if (!isLoggedIn) {
    //     navigate('/');
    // }

    // useEffect(() => {
    //     // setUserIcon(user.picture);
    //     console.log(user.picture);
    // }, [user]);

    return (
        <div className='flex justify-between fixed w-screen top-0 backdrop-blur-lg  '>
            <div className='left flex mt-6 ml-4 mb-3 '>
                <div className='pfp '>
                    <img src={user ? user.picture : icon} alt="" className='w-[46px] h-[46px] rounded-full' />
                </div>
                <div className='text flex flex-col ml-1  '>
                    <Typography color='white' className='font-semibold' variant='h6'>
                        Welcome, {user?.name}
                    </Typography>
                    <Typography color='white' variant='small' className='font-'>
                        Mumbai, India
                    </Typography>

                </div>
            </div>
            <div className='right flex mt-8 gap-3 mr-8'>
                <CiBellOn onClick={clickHandler} color='white' className='w-[28px] h-[28px]' />
                <CiMenuBurger color='white' className='w-[28px] h-[28px]' />
            </div>

        </div>
    )
}

export default Navbar