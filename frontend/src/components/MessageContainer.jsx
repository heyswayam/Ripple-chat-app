import React from "react";
import SendInput from "./SendInput";
import MessageList from "./MessageList";
import { useSelector } from "react-redux";


const MessageContainer = ({ onBackClick }) => {
	const { selectedUser, authUserData, onlineUsers } = useSelector((store) => store.user);
	const isOnline = onlineUsers?.includes(selectedUser?._id);

	return (
		<>
			{selectedUser !== null ? (
				<div className='w-full flex flex-col h-full bg-gray-900'>
					<div className='flex gap-2 items-center bg-gray-800 text-white px-4 py-2 mb-2 shadow-md'>
						<div className={`avatar ${isOnline ? "online" : ""}`}>
							<div className='w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
								<img src={selectedUser?.profilePhoto} alt='user-profile' />
							</div>
						</div>
						<div className='w-full'>
							<div className='flex justify-between gap-2 items-center'>
								<p className='text-lg font-semibold'>{selectedUser?.fullname}</p>
								{isOnline && <div className='text-sm text-green-500'>Online</div>}
							</div>
						</div>
                        <button 
                            onClick={onBackClick} 
                            className='sm:hidden p-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 w-full max-w-32'
                        >
                            Back to Chats
                        </button>
					</div>
					<div className='flex-1 overflow-auto w-[98%] mx-auto'>
						<MessageList />
					</div>
					<div className='p-4 mt-3 bg-gray-800'>
						<SendInput />
					</div>
				</div>
			) : (
				<div className='w-full flex flex-col justify-center items-center h-full bg-gray-900'>
					<h1 className='text-4xl text-white font-bold'>Hi, {authUserData?.fullname}</h1>
					<h1 className='text-2xl text-white mt-2'>Let's start a conversation</h1>
				</div>
			)}
		</>
	);
};

export default MessageContainer;
