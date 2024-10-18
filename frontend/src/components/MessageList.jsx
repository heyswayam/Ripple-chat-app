import React from "react";
import Message from "./Message";
import UseGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import UseGetRealTimeMessage from "../hooks/useGetRealTimeMessage";



const MessageList = () => {
	UseGetMessages();
	UseGetRealTimeMessage();
	const { messages } = useSelector((store) => store.message);
	return (
		<div className="flex-1 overflow-auto">
            {messages && messages.length > 0 ? (
                messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            ) : (
                <div className="flex items-center justify-center h-full">
    <p className="text-gray-500 text-lg italic">No messages yet.</p>
</div>
            )}
        </div>
	);
};

export default MessageList;
