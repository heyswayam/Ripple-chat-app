import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage, setMessages } from '../context/messageSlice';
import conf_env from '../conf_env/conf_env';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser, authUserData } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

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
                    className='input input-bordered w-full'
                    placeholder='Type a message...'
                />
                <button type='submit' className='btn btn-primary absolute right-0 top-0 rounded-l-none'>
                    Send
                </button>
            </div>
        </form>
    );
};

export default SendInput;