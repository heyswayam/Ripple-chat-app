import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUserData } = useSelector((store) => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const isSender = message?.senderId === authUserData?._id;

    return (
        <div ref={scroll} className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2  `}>

				
            <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-2 rounded-lg ${isSender ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} shadow-md`}>
                <div className='text-sm'>
                    {message?.message}
                </div>
                <div className='text-xs text-right opacity-70 mt-1'>
                    <time>{new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                </div>
            </div>

        </div>
    );
};

export default Message;
