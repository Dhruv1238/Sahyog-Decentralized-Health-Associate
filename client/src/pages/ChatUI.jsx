// ChatUI.js

import React from 'react';
import { healthReportChat } from '../formVals/healthReportChat';
import { Input } from '@material-tailwind/react';

const ChatUI = () => {
    return (
        <div className="max-w-screen-sm p-4 mx-auto">
            <div className='fixed top-0 left-0 right-0 flex flex-col items-center justify-center gap-3 p-2 text-center bg-white'>
                <h1 className="text-2xl font-bold">Ask the bot about your queries</h1>
                <p className="text-gray-500">Ask anything about your health</p>
            </div>
            <div className='my-24'>
                {healthReportChat.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'bot' ? 'bg-blue-500 text-white flex-1' : 'bg-green-500 text-white ml-auto flex-1'} flex rounded-xl p-2 m-1 w-40`}
                    >
                        {message.message}
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex items-center gap-2 p-1 bg-white">
                <Input
                    placeholder="Type a message"
                    className="flex-1"
                />
                <button className="p-2 text-white bg-blue-500 rounded-xl">Send</button>
            </div>
        </div>
    );
};

export default ChatUI;
