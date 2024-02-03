import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '../context/FormProvider';
import { Button, Typography, Spinner } from '@material-tailwind/react';
import { FaUpload } from 'react-icons/fa';
import { Input, Select, Option } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@arcana/auth-react';
import { Interaction } from '../components/contract/Interaction';


const BasicInfo = () => {
    const { form1, updateFormData } = useFormContext();
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);

    const { storeUserDetails, loading } = useContext(Interaction);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            updateFormData('completed', true);
            navigate('/medicaldetails');
        } else {
            updateFormData('completed', false);
        }
    };

    const validateForm = () => {
        // Perform your validation logic here
        const isValid = Object.values(form1).every((value) => value !== '');
        setIsFormValid(isValid);
        console.log(isValid);
    };



    const { user } = useAuth();

    const [userName, setUserName] = useState(user?.name);
    const [userEmail, setUserEmail] = useState(user?.email);
    const [userGender, setUserGender] = useState("")


    useEffect(() => {
        updateFormData('name', userName);
        updateFormData('email', userEmail);
        updateFormData('gender', userGender);
        validateForm();
    }, [userName, userEmail, userGender]);

    useEffect(() => {
        console.log(form1);
        validateForm();
    }, [form1]);

    const onSubmit = () => {
        storeUserDetails(
            form1.age,
            form1.gender,
            form1.name,
            form1.phone
        )
    };

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center backdrop-blur-md bg-black bg-opacity-50">
                    <Spinner color="blue" className='h-12 w-12' />
                    <Typography color="white" className=" text-xl">
                        Uploading...
                    </Typography>
                </div>
            )}
            <div className='flex flex-col gap-10 my-10 mx-7'>
                <motion.div
                    className='flex flex-col gap-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography color='blue' className='font-inter'>
                        You are all set!!
                    </Typography>
                    <Typography color='white' className='text-3xl font-bold font-inter'>
                        Complete your Profile
                    </Typography>
                </motion.div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-2'>
                        <Typography color='white' className='font-bold text-blue-500 text-md font-inter'>
                            Basic Info
                        </Typography>
                        <div className='flex flex-col gap-6 mb-1'>
                            <Input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                size='lg'
                                placeholder='Your Name'
                                className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                            />
                            <Input
                                type='number'
                                onChange={(e) => updateFormData('age', e.target.value)}
                                value={form1.age}
                                size='lg'
                                placeholder='Your Age'
                                className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                            />
                            <Select
                                onChange={(selectedOption) => updateFormData('gender', selectedOption.value)}
                                value={form1.gender}
                                label='Your Gender/Sex'
                                className='text-white color-white'
                            >
                                <Option onClick={() => setUserGender("Male")} value='Male'>Male</Option>
                                <Option onClick={() => setUserGender("Female")} value='Female'>Female</Option>
                            </Select>
                            <Input
                                size='lg'
                                placeholder='Your Emergency Contact Number'
                                onChange={(e) => updateFormData('emergency_phone', e.target.value)}
                                value={form1.emergency_phone}
                                className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                            />
                            <Input
                                size='lg'
                                value={form1.emergency_phone_name}
                                onChange={(e) => updateFormData('emergency_phone_name', e.target.value)}
                                placeholder='Name of Emergency Contact'
                                className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                            />
                            <Input
                                size='lg'
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder='Your Email'
                                className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                            />
                            <Input
                                size='lg'
                                value={form1.phone}
                                onChange={(e) => updateFormData('phone', e.target.value)}
                                placeholder='Your Phone Number'
                                className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                            />
                            {/* <Select label='Blood Group' className='text-white color-white'>
                            <Option onClick={() => form1.bloodgrp = "A+"} value='A+'>A+</Option>
                            <Option onClick={() => form1.bloodgrp = "A-"} value='A-'>A-</Option>
                            <Option onClick={() => form1.bloodgrp = "B+"} value='B+'>B+</Option>
                            <Option onClick={() => form1.bloodgrp = "B-"} value='B-'>B-</Option>
                            <Option onClick={() => form1.bloodgrp = "O+"} value='O+'>O+</Option>
                            <Option onClick={() => form1.bloodgrp = "O-"} value='O-'>O-</Option>
                            <Option onClick={() => form1.bloodgrp = "AB-"} value='AB-'>AB-</Option>
                            <Option onClick={() => form1.bloodgrp = "AB+"} value='AB+'>AB+</Option>
                        </Select>
                        <Input
                            type='number'
                            onChange={(e) => updateFormData('height', e.target.value)}
                            value={form1.height}
                            size='lg'
                            placeholder='Your Height (in cm)'
                            className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                        />
                        <Input
                            type='number'
                            onChange={(e) => updateFormData('weight', e.target.value)}
                            value={form1.weight}
                            size='lg'
                            placeholder='Your Weight (in kgs)'
                            className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                        />
                        <Input
                            type='text'
                            onChange={(e) => updateFormData('bpl', e.target.value)}
                            size='lg'
                            value={form1.bpl}
                            placeholder='BPL Services if any'
                            className='!border-t-blue-gray-200 focus:!border-t-gray-900 text-white'
                        /> */}
                            <div className='flex justify-between'>
                                <Button onClick={() => onSubmit()} size='lg' color='blue' className='white' disabled={!isFormValid}>
                                    Submit
                                </Button>
                                <Button onClick={() => navigate('/details')} type='button' size='lg' color='blue' className='white'>
                                    Back
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BasicInfo;
