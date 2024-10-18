import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
	const scroll = useRef();
	const { authUserData, selectedUser } = useSelector((store) => store.user);

	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: "smooth" });
	}, [message]);

	return (
		<div ref={scroll} className={`flex flex-col ${message?.senderId === authUserData?._id ? "items-end" : "items-start"}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={message?.senderId === authUserData?._id ? authUserData?.profilePhoto : selectedUser?.profilePhoto} />
				</div>
			</div>
			<div className='chat-header'>
				<time className='text-xs opacity-50 text-white'>12:45</time>
			</div>
			<div className={`chat-bubble ${message?.senderId !== authUserData?._id ? "bg-gray-300 text-black" : "bg-blue-200 text-black"} `}>{message?.message}</div>
		</div>
	);
};

export default Message;
