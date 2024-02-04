import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaUpload } from "react-icons/fa";

export const MedMatch = () => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const images = files.map(file => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{width: '50px'}} alt="preview" />
            </div>
            <div>{file.path}</div>
        </div>
    ));

    return (
        <div className="flex flex-col font-inter items-center justify-center h-screen text-white p-10">
            <div {...getRootProps({className: 'dropzone flex flex-col items-center justify-center w-full h-64 p-4 text-white border-2 border-gray-600 border-dashed rounded-xl'})}>
                <input {...getInputProps()} />
                <FaUpload size={40} />
                <p className='text-center'>Drag 'n' drop your report images here, or click to select files</p>
            </div>
            <aside className='flex flex-col'>
                {images}
            </aside>
        </div>
    );
};