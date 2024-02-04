import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaUpload } from "react-icons/fa";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import {
    Button, Typography, Spinner, IconButton,
    Popover,
    PopoverHandler,
    PopoverContent,
    Select,
    Option,
    Input,
    Textarea,
} from "@material-tailwind/react";
import Appbar from '../components/appbar/Appbar';
import ReactMarkdown from 'react-markdown';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../components/FirebaseSDK';
import { useNavigate } from 'react-router-dom';


const MODEL_NAME = "gemini-pro-vision";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const MedMatch = () => {
    const [files, setFiles] = useState([]);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [json, setJson] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const run = async (acceptedFiles) => {
        setLoading(true);
        const parts = await Promise.all([
            { text: "This is my report :" },
            ...acceptedFiles.map(async file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            inlineData: {
                                mimeType: file.type,
                                data: reader.result.split(',')[1]
                            }
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            }),
            { text: "\n\nPlease give an overview and tell me that which specialisation of doctor should I approach according to the report, Give the Contact information of the best specialist doctor in the required feild in mumbai with his/her hospital name and give a real contact number and a random date in the coming week to book an appointment. I want the the response in json format with keys being - \\\"overview\\\", \\\"specialist1\\\", \\\"date\\\". If you don't find any appropriate doctor, then give a generic Indian name and the remaining response as per the report given" },
        ]);

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        setResponse(response.text());
        const responseText = response.text();
        const responseObject = JSON.parse(responseText);
        setJson(responseObject);
        setLoading(false);
        console.log(response.text());
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop: acceptedFiles => {
            setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))]);
        }
    });

    useEffect(() => {
        if (json) {
            setTitle(json?.specialist1?.name+" "+json?.specialist1?.hospital);
            setDescription(json?.overview + " Contact No." + json?.specialist1?.contact);
        }
    }, [json]);

    const handleAutomate = () => {
        console.log(files);
        run(files);
    }

    const handleEventAdd = async () => {
        const newEvent = {
            title: title,
            text: description,
            date: date,
        };

        try {
            const docRef = await addDoc(collection(db, "events"), newEvent);
            console.log("Document written with ID: ", docRef.id);
            navigate('/calendar')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    console.log(json);


    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center backdrop-blur-md bg-black bg-opacity-50">
                    <Spinner color="blue" className='w-12 h-12' />
                    <Typography color="white" className="text-xl ">
                        Generating Summary
                    </Typography>
                </div>
            )}
            <div className="md:mx-60 flex flex-col font-inter items-center justify-center h-screen text-white p-10 gap-10">
                {response === "" ? (
                    <>
                        <div {...getRootProps({ className: 'dropzone flex flex-col items-center gap-5 justify-center w-full h-64 p-4 text-white border-2 border-gray-600 border-dashed rounded-xl' })}>
                            <input {...getInputProps()} />
                            <FaUpload size={30} />
                            <p className='text-center'>
                                {files.length > 0 ? `${files.length} iamge(s) added` : "Drag 'n' drop your report images here, or click to select files"}
                            </p>
                        </div>
                        <Button className='text-color1 bg-color3 font-inter' fullWidth onClick={handleAutomate}>Start Automation</Button>
                    </>) : (
                    <>
                        <div className='bg-color3 p-5 rounded-xl text-lg flex flex-row gap-5'>
                            <ReactMarkdown>{json.overview}</ReactMarkdown>
                            <Popover placement="bottom" className="z-[999]">
                                <PopoverHandler>
                                    <IconButton color="indigo" size="sm" className="rounded-full mx-1 min-h-10 min-w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                        </svg>
                                    </IconButton>
                                </PopoverHandler>
                                <PopoverContent className="z-[9999] bg-[#EBEBF1] flex flex-col gap-5">
                                    <Typography color="black" variant="h6" className=" font-info">Finalizing</Typography>
                                    <Input type="date" color="indigo" size="md" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                                    <Input type="text" color="indigo" size="md" label="Title" value={json.specialist1.hospital} />
                                    {/* <Input type="text" color="indigo" size="md" label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} /> */}
                                    <Textarea type="number" color="indigo" size="md" label="Description" value={json.overview + " Contact No." + json.specialist1.contact} />
                                    <Button color="indigo" onClick={handleEventAdd} >Add</Button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </>
                )}
            </div >
            <Appbar />
        </>
    );
};