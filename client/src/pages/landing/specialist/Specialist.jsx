import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Appbar from '../../../components/appbar/Appbar';
import docPhoto from '../../../assets/doctor.png';
import { Button } from "@material-tailwind/react";
import { Typography } from '@material-tailwind/react';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../components/FirebaseSDK'

const Specialist = () => {
    const [specialists, setSpecialists] = useState([]);
    const { id } = useParams();
    // const { photoSrc } = window.history.state;
    const handlePhoneClick = () => {
        const phoneNumber = '1234567890'; // Replace with the actual phone number
        window.location.href = `tel:${phoneNumber}`;
    };
    const handleOnChat = () => {
        window.location.href = '/doctorChat';
    }
    

    const handleOnClick = () => {
        const text = "Hi, I want to book an appointment can you please let me know if its possible and also the details."
        window.open(`https://wa.me/7999250587?text=${encodeURIComponent(text)}`, "_blank");
    }

    // const querySnapshot = await getDocs(collection(db, "specialists"));
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "specialists"));
            const specialistsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setSpecialists(specialistsData);
            setLoading(false);
            console.log(specialistsData);
        };

        fetchPosts();
    }, []);

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const docRef = doc(db, "specialists", id);
    //         const docSnap = await getDoc(docRef);
    
    //         if (docSnap.exists()) {
    //             setSpecialists(docSnap.data());
    //             setLoading(false);
    //         } else {
    //             console.log("No such document!");
    //         }

    //         console.log(specialists);
    //     };
    
    //     fetchPost();
    // }, [id]); // dependency array includes id

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            {/* <div>
                {specialists.map((specialist) => (
                    <div key={specialist.id}>
                        <h1>{specialist.title}</h1>
                        <p>{specialist.description}</p>
                    </div>
                ))}
            </div> */}
            <div className='flex flex-col mt-[100px]  ml-7 h-screen overflow-scroll '>
                <div className='flex flex-col gap-1 mb-3'>
                    <Typography color='white' className='text-3xl font-bold font-inter'>
                        {/* {name} */}
                        {specialists[id].name}
                    </Typography>
                    <Typography color='gray' className='text-md font-inter'>
                        {/* {degree} */}
                        {specialists[id].degree}
                    </Typography>
                </div>
                <div>
                    <img src={docPhoto} alt="Specialist Photo" />
                </div>
                <div>
                    <Typography color='white' className='mt-5 text-xl font-bold font-inter '>
                        About
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] '>
                        {specialists[id].about}
                    </Typography>
                </div>
                <div>
                    <Typography color='white' className='mt-5 text-xl font-bold font-inter '>
                        Qualifications
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] '>
                        {/* <ul>
                            <li>MBBS from AIMS Dehli</li>
                            <li>MD</li>
                            <li>DM</li>
                            <li>PhD</li>

                        </ul> */}
                        {specialists[id].qualifications}
                    </Typography>
                </div>
                <div>
                    <Typography color='white' className='mt-5 text-xl font-bold font-inter '>
                        Books and Theises
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] '>
                        {/* <ul>
                            <li>Book 1</li>
                            <li>Book 2</li>
                            <li>Book 3</li>
                            <li>Book 4</li>

                        </ul> */}
                        {specialists[id].books}
                    </Typography>
                </div>
                <div>
                    <Typography color='white' className='mt-5 text-xl font-bold font-inter '>
                        Contact Details
                    </Typography>
                    <Typography color='gray' className='text-sm font-inter w-[350px] '>
                        <ul>
                            <li onClick={handlePhoneClick} style={{ cursor: 'pointer' }}>
                                Phone Number: {specialists[id].phone}
                            </li>
                            <li>Email: {specialists[id].email} </li>
                        </ul>
                    </Typography>
                </div>
                <div className='w-full' >
                    <div className='flex justify-center gap-3 mt-5 mr-5 mb-28'  >
                        <Button className='px-16 py-4 ' size='sm' color='blue' >
                            <Link to='/doctorChat'>
                                Chat
                            </Link>
                        </Button>
                        <Button className='border-2 border-[#65ADE1]' variant='outlined' size='sm' onClick={handleOnClick}>
                            <div className='text-white'>
                                Book an Appointment
                            </div>
                        </Button>
                        <Button className='border-2 border-[#65ADE1]' variant='outlined' size='sm' onClick={handleOnChat}>
                            <div className='text-white'>
                                Chat
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <Appbar />
        </>
    );
};

export default Specialist;
