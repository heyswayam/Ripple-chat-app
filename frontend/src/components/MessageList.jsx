import React from "react";
import Message from "./Message";
import UseGetMessages from "../hooks/useGetMessages";
import { useSelector, useDispatch } from "react-redux";
import UseGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

import { PulseLoader } from "react-spinners";

const MessageList = () => {
	const loading = useSelector((store) => store.loading.loader);
	const dispatch = useDispatch();
	UseGetMessages();
	UseGetRealTimeMessage();
	const { selectedUser } = useSelector((store) => store.user);
	const { conversations } = useSelector((store) => store.message);

	const currentConversation = selectedUser ? conversations[selectedUser._id] : null;
	const messages = currentConversation ? currentConversation.messages : [];

	return loading === false ? (
		<div className='flex-1 overflow-auto'>
			{messages && messages.length > 0 ? (
				messages.map((message) => <Message key={message._id} message={message} />)
			) : (
				<div className='flex items-center justify-center h-full'>
					<p className='text-gray-500 text-lg italic'>No messages yet.</p>
				</div>
			)}
		</div>
	) : (
		<div className='flex h-full overflow-hidden justify-center items-center '>
			<PulseLoader color='#f3f4f6' size={15} />
		</div>
	);
};

export default MessageList;
