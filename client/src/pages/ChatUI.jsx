// ChatUI.js

import React from 'react';
import { Input, Button } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { IoSendSharp } from "react-icons/io5";

const ChatUI = ({ sourceId, fileName }) => {
    const [content, setContent] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setContent('');
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content },
        ]);

        try {
            const responseMessage = await axios.post('https://api.chatpdf.com/v1/chats/message', {
                "sourceId": sourceId.sourceId,
                "messages": [
                    {
                        role: 'user',
                        content: content,
                    },
                ],
            }, {
                headers: {
                    'x-api-key': import.meta.env.VITE_CHATPDF_API_KEY,
                },
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: responseMessage.data.content },
            ]);

            setContent('');
        } catch (error) {
            console.error('Error:', error.message);
            console.error('Response:', error.response?.data);
        }
    };

    return (
        <div className="max-w-screen-sm md:max-w-full p-4 mx-auto md:mx-10 max-h-">
            <div className='flex flex-col items-center justify-center gap-3 p-2 text-center '>
                <h1 className="text-2xl font-bold text-color1">SARTHI here!</h1>
                <p className="text-color1">Ask anything Regarding {fileName.fileName}</p>
            </div>
            <div ref={chatContainerRef} className='flex flex-col gap-2 my-36'>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.role === 'assistant' ? 'bg-gray-800 text-white mr-auto ' : 'bg-color3 text-white ml-auto'
                            } flex rounded-xl p-3 m-1 max-w-[80%] md:max-w-[50%] text-base`}
                    >
                        {message.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="fixed bottom-24 left-0 right-0 flex items-center gap-2 p-4 bg-[#121212]" onSubmit={(e) => handleFormSubmit(e)}>
                <Input
                    label='Start Talking to your report..'
                    className="flex-1 p-1 text-[18px] text-white rounded-md"
                    color='white'
                    value={content}
                    size='lg'
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button className="p-2 text-white rounded-md bg-color2 min-w-10 min-h-10 flex flex-1 items-center justify-center gap-4" size='lg' type='submit'><IoSendSharp /></Button>
            </form>
        </div>
    );
};

export default ChatUI;
