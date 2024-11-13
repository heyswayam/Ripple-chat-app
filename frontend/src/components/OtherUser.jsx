import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../context/userSlice";
import { PulseLoader } from "react-spinners";
const OtherUser = ({ user, onChatClick }) => {
	const dispatch = useDispatch();
	const { selectedUser, onlineUsers, typingUsers } = useSelector((store) => store.user);
	const isOnline = onlineUsers?.includes(user._id);
	const isTyping = typingUsers[selectedUser?._id];
	const selectedUserHandler = (user) => {
		dispatch(setSelectedUser(user));
		onChatClick();
	};

	return (
		<>
			<div onClick={() => selectedUserHandler(user)} className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${selectedUser?._id === user?._id ? "bg-blue-600 text-white" : "bg-gray-800 text-white hover:bg-gray-700"}`}>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition-transform duration-300 ease-in-out transform hover:scale-105'>
						<img src={user?.profilePhoto} alt='user-profile' className='rounded-full' />
					</div>
				</div>
				<div className='flex w-full justify-between items-center'>
					<div className='flex flex-col'>
						<p className='text-base font-medium'>{user?.fullname}</p>
						<div className='flex items-center gap-2'>
							<p className='text-xs text-gray-300'>@{user?.username}</p>
							{user?._id === selectedUser?._id && isTyping && (
								<div className='flex items-baseline gap-0.5'>
									<span className='text-xs text-blue-400 animate-pulse '>typing</span>
									<PulseLoader color='#60a5fa' size={4} speedMultiplier={0.8} />
								</div>
							)}
						</div>
					</div>
					{isOnline && <div className='text-sm text-green-500'>Online</div>}
				</div>
			</div>
			<div className='divider my-1'></div>
		</>
	);
};

export default OtherUser;
