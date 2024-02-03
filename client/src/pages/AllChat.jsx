// Chat.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@arcana/auth-react';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { getDocs, setDoc } from 'firebase/firestore';
import { db } from '../components/FirebaseSDK';
import { FiMessageSquare, FiUser, FiCheck } from 'react-icons/fi'


const ChatBlock = ({ chat, user }) => {
    const navigate = useNavigate();
    const [otherUser, setOtherUser] = useState({});
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchOtherUser = async () => {
            const otherUserId = chat.users.find(userId => userId !== user.publicKey);
            const otherUserDocRef = collection(db, 'users', otherUserId);
            const otherUserDoc = await getDocs(otherUserDocRef);
            const otherUserData = otherUserDoc.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOtherUser(otherUserData[0]);
        };

        fetchOtherUser();
    }, [chat, user.publicKey]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'chats', chat.id, 'messages'), where('read', '==', false)), (snapshot) => {
            setUnreadCount(snapshot.docs.length);
        });

        return () => unsubscribe();
    }, [chat.id]);

    const handleChatClick = () => {
        navigate(`/chat/${chat.id}`);
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-500">
            <div className="flex items-center gap-4">
                {/* Default picture using react icons */}
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                    <h3 className="text-lg font-semibold">{otherUser.name}</h3>
                    <p className="text-gray-500">{lastMessage}</p>
                </div>
            </div>
            <div className="flex items-center">
                {/* Unread Mark */}
                {unreadCount > 0 && (
                    <div className="w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
                )}
                {/* Open Chat Button */}
                <button onClick={handleChatClick} className="px-4 py-2 text-white bg-green-500 rounded">Open Chat</button>
            </div>
        </div>
    );
};

const Chat = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [newChatError, setNewChatError] = useState('');

    useEffect(() => {
        console.log("Chats:", chats);
        if (user) {
            const unsubscribe = onSnapshot(query(collection(db, 'chats'), where('users', 'array-contains', user.publicKey)), (snapshot) => {
                const chatsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setChats(chatsData);
            });

            return () => unsubscribe();
        }
    }, [db, user]);

    useEffect(() => {
        if (!user) {
            console.log('User not logged in. Redirecting to login page...');
        }
        if (user) {
            const unsubscribe = onSnapshot(query(collection(db, 'users')), (snapshot) => {
                const usersData = snapshot.docs
                    .filter(doc => doc.id !== user.publicKey)
                    .map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersData);
            });
            return () => unsubscribe();
        }
    }, [db, user]);

    const handleCreateChat = async () => {
        if (selectedUser) {
            try {
                const filteredChats = chats.filter(chat => {
                    const chatUsers = chat.users;
                    return chatUsers.includes(selectedUser) && chatUsers.includes(user.publicKey);
                });
                console.log('Filtered chats:', filteredChats);

                if (filteredChats.length > 0) {
                    const existingChatId = filteredChats[0].id;
                    console.log('Chat already exists. Redirecting to existing chat:', existingChatId);
                    navigate(`/chat/${existingChatId}`);
                } else {
                    const chatDocRef = await addDoc(collection(db, 'chats'), {
                        users: [user.publicKey, selectedUser],
                        messages: [],
                    });

                    console.log('New chat created with ID:', chatDocRef.id);
                    setSelectedUser('');
                    setNewChatError('');
                    navigate(`/chat/${chatDocRef.id}`);
                }

                return filteredChats;
            } catch (error) {
                console.error('Error creating or checking chat:', error.message);
                setNewChatError('Error creating or checking chat. Please try again.');
            }
        } else {
            setNewChatError('Please select a user to create a chat.');
        }

        return [];
    };



    return (
        <div className="flex flex-col justify-center p-4 text-white">
            <div>
                <h1 className="text-3xl font-bold text-center">Chats</h1>
                {
                    chats.map(chat => (
                        <ChatBlock key={chat.id} chat={chat} user={user} />
                    ))
                }
            </div>
        </div>
    );
};

export default Chat;
