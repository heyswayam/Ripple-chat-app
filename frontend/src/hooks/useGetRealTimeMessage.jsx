import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageToConversation } from "../context/messageSlice";
import {setTypingStatus} from "../context/userSlice";
import { setLoader } from "../context/loaderSlice";



const UseGetRealTimeMessage = () => {
    const { authUserData } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const { socket } = useSelector(store => store.socket);

    useEffect(() => {

        socket?.on("newMessage", (newMessage) => {
            dispatch(setLoader(true));
            const conversationUserId = newMessage.senderId === authUserData._id 
                ? newMessage.receiverId 
                : newMessage.senderId;
            
            dispatch(addMessageToConversation({ 
                userId: conversationUserId, 
                message: newMessage 
            }));
            dispatch(setLoader(false));
        });

        socket.on("typingStatus", ({ userId, isTyping }) => {
            dispatch(setTypingStatus({ userId, isTyping }));
        });

        return () => {
            socket?.off("newMessage");
            socket?.off("typingStatus");
        };
    }, [dispatch]);
};

export default UseGetRealTimeMessage;