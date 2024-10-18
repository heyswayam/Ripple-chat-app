import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../context/messageSlice';
import conf_env from '../conf_env/conf_env';

const SendInput = () => {
    const [message, setMessage] = useState('');
    const { authUserData, selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const senderId = authUserData?._id;
            const receiverId = selectedUser?._id;
            const res = await axios.post(`${conf_env.backendURL}/message/send/${senderId}/${receiverId}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            dispatch(addMessage(res?.data?.data));
        } catch (error) {
            console.log(error);
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
                />
                <button type='submit' className='btn bg-blue-600 hover:bg-blue-700 text-white absolute right-0 top-0 h-full rounded-r-full px-4'>
                    Send
                </button>
            </div>
        </form>
    );
};

export default SendInput;