import React from 'react';
import OtherUser from './OtherUser';
import UseGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";

const OtherUserList = ({ onChatClick }) => {
    UseGetOtherUsers();
    const { otherUsers, onlineUsers } = useSelector(store => store.user);

    if (!otherUsers) return null;

    // Sort users with online users first
    const sortedUsers = [...otherUsers].sort((a, b) => {
        const isAOnline = onlineUsers?.includes(a._id);
        const isBOnline = onlineUsers?.includes(b._id);
        
        if (isAOnline && !isBOnline) return -1;
        if (!isAOnline && isBOnline) return 1;
        return 0;
    });

    return (
        <div className='overflow-auto flex-1'>
            {sortedUsers.map((user) => (
                <OtherUser 
                    key={user._id} 
                    user={user} 
                    onChatClick={onChatClick} 
                />
            ))}
        </div>
    );
}

export default OtherUserList;