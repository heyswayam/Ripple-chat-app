import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../context/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        console.log("Selecting user:", user);
        dispatch(setSelectedUser(user));
    };

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                    selectedUser?._id === user?._id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
            >
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition-transform duration-300 ease-in-out transform hover:scale-105'>
                        <img src={user?.profilePhoto} alt="user-profile" className='rounded-full' />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base font-medium'>{user?.fullname}</p>
                        {isOnline && <span className='text-sm text-green-500'>Online</span>}
                    </div>
                </div>
            </div>
            <div className='divider my-1'></div>
        </>
    );
};

export default OtherUser;