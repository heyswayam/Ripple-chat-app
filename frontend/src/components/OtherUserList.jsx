import React from 'react';
import OtherUser from './OtherUser';
import UseGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";

const OtherUserList = ({ onChatClick }) => {
    UseGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);
    if (!otherUsers) return;

    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} onChatClick={onChatClick} />
                    )
                })
            }
        </div>
    );
}

export default OtherUserList;