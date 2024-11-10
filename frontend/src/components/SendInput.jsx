import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addMessageToConversation } from '../context/messageSlice';
import conf_env from '../conf_env/conf_env';

const SendInput = () => {
    const [message, setMessage] = useState('');
    const { authUserData, selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const sendMessage = async () => {
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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const onClickHandler = (e) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div className='w-full relative overflow-hidden'>
                <input
                    value={message}
                    type='text'
                    onChange={(e) => setMessage(e.target.value)}
                    className='input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 rounded-full pl-4 pr-16'
                    placeholder='Type a message...'
                    disabled={!selectedUser}
                />
                <button 
                    type='button' 
                    onClick={onClickHandler}
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