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
                <p>No messages yet.</p>
            )}
        </div>
	);
};

export default MessageList;
