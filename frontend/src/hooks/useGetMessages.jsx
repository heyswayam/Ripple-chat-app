import React, { useEffect } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { setMessages } from '../context/messageSlice';
// import { BASE_URL } from '..';
import conf_env from '../conf_env/conf_env';



const useGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${conf_env.backendURL}/message/${selectedUser?._id}`);
                dispatch(setMessages(res.data.data));
                // console.log(res.data.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser?._id,setMessages]);
}

export default useGetMessages
