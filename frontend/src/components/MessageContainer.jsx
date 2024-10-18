import React from "react";
import SendInput from "./SendInput";
import MessageList from "./MessageList";
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, authUserData, onlineUsers } = useSelector((store) => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {selectedUser !== null ? (
                <div className='md:min-w-[550px] flex flex-col'>
                    <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                        <div className={`avatar ${isOnline ? "online" : ""}`}>
                            <div className='w-12 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt='user-profile' />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between gap-2'>
                                <p>{selectedUser?.fullname}</p>
                            </div>
                        </div>
                    </div>
                    <MessageList />
                    <SendInput />
                </div>
            ) : (
                <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                    <h1 className='text-4xl text-white font-bold'>Hi, {authUserData?.fullname}</h1>
                    <h1 className='text-2xl text-white'>Let's start a conversation</h1>
                </div>
            )}
        </>
    );
};

export default MessageContainer;