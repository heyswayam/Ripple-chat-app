import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addMessageToConversation } from '../context/messageSlice';
import conf_env from '../conf_env/conf_env';

const SendInput = () => {
    const [message, setMessage] = useState('');
    const { authUserData, selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim() || !selectedUser) return;

        try {
            const senderId = authUserData?._id;
            const receiverId = selectedUser?._id;
            const res = await axios.post(`${conf_env.backendURL}/message/send/${senderId}/${receiverId}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const newMessage = res?.data?.data;
            dispatch(addMessageToConversation({ 
                userId: receiverId, 
                message: newMessage 
            }));

            // Optionally, we can also add the message to the sender's conversation view
            // This is useful if we want to show sent messages immediately in the sender's view
            dispatch(addMessageToConversation({ 
                userId: senderId, 
                message: newMessage 
            }));

        } catch (error) {
            console.error("Error sending message:", error);
            // Optional, add error handling UI 
        }
        setMessage("");
    };

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 rounded-full pl-4 pr-16'
                    placeholder='Type a message...'
                    disabled={!selectedUser}
                />
                <button 
                    type='submit' 
                    className='btn bg-blue-600 hover:bg-blue-700 text-white absolute right-0 top-0 h-full rounded-r-full px-4'
                    disabled={!selectedUser || !message.trim()}
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default SendInput;

