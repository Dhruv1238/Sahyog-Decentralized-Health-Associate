import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@arcana/auth-react';
import { db } from '../components/FirebaseSDK';
import { onSnapshot, collection, where, query } from 'firebase/firestore';
import { useRef } from 'react';
import { addDoc, orderBy, doc, getDocs, getDoc } from 'firebase/firestore';
import React from 'react';

const DoctorChat = () => {
    const { user } = useAuth();
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const messagesEndRef = useRef(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChatData = async () => {

            const chatDocRef = doc(db, 'chats', chatId);
            const chatDocSnapshot = await getDoc(chatDocRef);

            if (chatDocSnapshot.exists()) {
                const chatData = chatDocSnapshot.data();
                const members = chatData.users;
                if (members && members.length > 0) {
                    const receiverId = members.find(memberId => memberId !== user?.publicKey);
                    const senderId = members.find(memberId => memberId === user?.publicKey);
                    setSender(senderId);
                    setReceiver(receiverId);
                    const receiverDocRef = doc(db, 'users', receiverId);
                    const receiverDocSnapshot = await getDoc(receiverDocRef);
                }
            }
        };
        fetchChatData();
    }, [chatId, user]);

    useEffect(() => {
        const chatDocRef = doc(db, 'chats', chatId);
        const chatDocSnapshot = onSnapshot(chatDocRef, (chatDoc) => {
            const chatData = chatDoc.data();
            const messagesCollection = chatData?.messages;

            if (messagesCollection) {
                const messagesQuery = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'));
                const messagesUnsubscribe = onSnapshot(messagesQuery, (messagesSnapshot) => {
                    const messagesData = messagesSnapshot.docs.map((doc) => doc.data());
                    setMessages(messagesData);
                });

                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

                return () => messagesUnsubscribe();
            }
        });

        return () => chatDocSnapshot();
    }, [chatId, user]);

    const handleSendMessage = async () => {
        console.log('Sender: ', sender);
        if (newMessage.trim() !== '') {
            try {
                await addDoc(collection(db, 'chats', chatId, 'messages'), {
                    sender: sender,
                    text: newMessage,
                    timestamp: new Date(),
                });
                setNewMessage('');
                console.log('Message sent!');

                const chatQuery = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'));
                const snapshot = await getDocs(chatQuery);
                const updatedMessages = snapshot.docs.map((doc) => doc.data());
                setMessages(updatedMessages);
            } catch (error) {
                console.error('Error sending message:', error.message);
            }
        }
    };

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
        <div className="flex flex-col h-screen">
            <div className="flex-grow px-4 py-2 overflow-y-auto">
                <h2 className='text-white'>Chatting with: {receiver}</h2>
                {messages.map((message, index) => (
                    <div key={index} className={`${message.sender === sender ? 'bg-color3 text-white ml-auto' : 'bg-gray-800 text-white mr-auto'} text-black flex rounded-xl p-3 m-1 text-base`}>
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-200">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 mr-2 border"
                />
                <button onClick={handleSendMessage} className="px-4 py-2 text-white bg-blue-500 rounded">Send</button>
            </div>
        </div >
    );
};

export default DoctorChat;
