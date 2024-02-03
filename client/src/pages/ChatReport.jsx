import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function ChatReport() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState('');
    const [sourceId, setSourceId] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            console.log(formData);
            console.log(selectedFile);
            console.log();

            try {
                const responseFile = await axios.post('https://api.chatpdf.com/v1/sources/add-file', formData, {
                    headers: {
                        'x-api-key': "sec_MhwKhYlWJTFduOCc0RbRy9qjcWQ3Mu4z",
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Source ID: ", responseFile.data.sourceId); 
                setSourceId(responseFile.data.sourceId);

                const responseMessage = await axios.post('https://api.chatpdf.com/v1/chats/message', {
                    "sourceId": responseFile.data.sourceId,
                    "messages": [
                        {
                            role: 'user',
                            content: content,
                        },
                    ],
                }, {
                    headers: {
                        'x-api-key': "sec_MhwKhYlWJTFduOCc0RbRy9qjcWQ3Mu4z",
                    },
                });

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'user', content: content },
                    { role: 'assistant', content: responseMessage.data.content },
                ]);
                console.log(messages);
                console.log(responseMessage);
                setContent('');
                setError('');
            } catch (error) {
                console.error('Error:', error.message);
                console.error('Response:', error.response?.data);
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='max-w-md p-8 mx-auto mt-10 bg-white shadow-md'>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className='mb-4'>
                    <label className='block mb-2 text-sm font-bold text-gray-700'>
                        Upload File:
                    </label>
                    <input type="file" onChange={handleFileSelect} className='w-full px-3 py-2 border rounded' />
                </div>
                <button type="submit" className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700'>
                    Submit
                </button>
                <div className='mt-4 text-gray-700'>
                    {sourceId && <div>Source ID: {sourceId}</div>}
                    {error && <div className='text-red-500'>{error}</div>}
                </div>
                <div className='mt-6'>
                    <label className='block mb-2 text-sm font-bold text-gray-700'>
                        Content:
                    </label>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='w-full px-3 py-2 border rounded'
                    />
                </div>
                <button type="submit" className='px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-700'>
                    Send Message
                </button>
            </form>
            <div className='mt-6'>
                {messages.map((message, index) => (
                    <p key={index} className='text-gray-700'>
                        {message.role}: {message.content}
                    </p>
                ))}
            </div>
        </div>
    );
}
