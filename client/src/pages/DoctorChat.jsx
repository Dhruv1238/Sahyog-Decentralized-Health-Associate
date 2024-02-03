import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@arcana/auth-react';
import { db } from '../components/FirebaseSDK';
import { onSnapshot, collection, where, query } from 'firebase/firestore';

const ChatBlock = ({ chat, user }) => {
    const { users, messages } = chat;
    const doctorMessages = messages.filter((msg) => msg.sender === 'doctor');
    const patientMessages = messages.filter((msg) => msg.sender === 'patient');

    return (
        <div className="flex flex-col overflow-y-auto h-96">
            <div className="mb-4">
                <h2 className="mb-2 text-lg font-semibold">Doctor Messages</h2>
                {doctorMessages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <span className="font-semibold">{users[0] === user.publicKey ? 'You' : 'Doctor'}:</span> {msg.text}
                    </div>
                ))}
            </div>

            <div>
                <h2 className="mb-2 text-lg font-semibold">Patient Messages</h2>
                {patientMessages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <span className="font-semibold">{users[1] === user.publicKey ? 'You' : 'Patient'}:</span> {msg.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

const DoctorChat = () => {
    const [chats, setChats] = useState([]);
    const { chatId } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const unsubscribe = onSnapshot(query(collection(db, 'chats'), where('users', 'array-contains', user.publicKey)), (snapshot) => {
                const chatsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setChats(chatsData);
            });

            return () => unsubscribe();
        }
    }, [db, user]);

    const selectedChat = chats.find((chat) => chat.id === chatId);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-4 border rounded shadow w-96">
                {selectedChat ? (
                    <ChatBlock chat={selectedChat} user={user} />
                ) : (
                    <p className='text-white'>Select a chat from the list</p>
                )}
            </div>
        </div>
    );
};

export default DoctorChat;
