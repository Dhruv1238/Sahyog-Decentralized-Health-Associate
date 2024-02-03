import React, { useState, useCallback } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFilePdf, FaUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

export function DrawerDefault() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <React.Fragment>
            <GiHamburgerMenu className='text-color1' onClick={openDrawer} size={40} />
            <Drawer open={open} onClose={closeDrawer} className="p-4">
                <div>
                    <h2 className='text-center'>Existing Chats</h2>
                    <div className='flex flex-col justify-center gap-10 p-4 m-2'>
                        <PdfChat name="Report 1" lastMessage="This is the first report" />
                        <PdfChat name="Report 2" lastMessage="This is the second report" />
                        <PdfChat name="Report 3" lastMessage="This is the third report" />
                    </div>
                </div>
            </Drawer>
        </React.Fragment>
    );
}

const PdfChat = ({ name, lastMessage, link }) => {
    const navigate = useNavigate();
    return (
        <div className='flex items-center gap-10' onClick={() => navigate('/')}>
            <FaFilePdf size={30} />
            <div className='flex flex-col justify-start'>
                <h6>{name}</h6>
                <p className='text-sm text-gray-500'>{lastMessage}</p>
            </div>
        </div>
    );
};

const ChatPDF = () => {
    const navigate = useNavigate();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [submit, setSubmit] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        console.log('Dropped files:', acceptedFiles);
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setSubmit(true);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
            <div className='flex justify-between m-2'>
                <DrawerDefault />
            </div>
            <div className='flex flex-col items-center justify-center gap-10 m-10'>
                <h1 className='text-3xl text-color1'>Upload a report</h1>
                <div {...getRootProps()} className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 bg-color3 text-color1"
                    >
                        {uploadedFile ? (
                            <div className="flex flex-col items-center justify-center gap-3 pt-5 pb-6">
                                <FaFilePdf size={40} />
                                <p className="mb-2 text-sm ">
                                    <span className="font-semibold">{uploadedFile.name}</span>
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-3 pt-5 pb-6">
                                <FaUpload size={40} />
                                <p className="mb-2 text-sm">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs">PDF FILE OF REPORT (MAX - 2MB)</p>
                            </div>
                        )}
                        <input id="dropzone-file" {...getInputProps()} className="hidden" />
                    </label>
                </div>
                <Button className='text-color1 bg-color3' disabled={!submit} onClick={()=>navigate('/chatui')}>Submit</Button>
            </div>
        </>
    );
};

export default ChatPDF;
