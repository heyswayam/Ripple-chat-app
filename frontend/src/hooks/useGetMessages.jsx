import { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../context/messageSlice';
import conf_env from '../conf_env/conf_env';

const UseGetMessages = () => {
    const { selectedUser,authUserData } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const senderId = authUserData?._id;
                const receiverId = selectedUser?._id;
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${conf_env.backendURL}/message/get/${senderId}/${receiverId}`);
                dispatch(setMessages(res.data.data));
            } catch (error) {
                console.log(error.response.data);
                dispatch(setMessages([]));
            }
        }
        if (selectedUser) {
            fetchMessages();
        }
    }, [selectedUser, dispatch]);
}

export default UseGetMessages;