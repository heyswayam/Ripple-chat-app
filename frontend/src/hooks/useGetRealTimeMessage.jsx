import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageToConversation } from "../context/messageSlice";
import { setLoader } from "../context/loaderSlice";
import { io } from "socket.io-client";
import conf_env from "../conf_env/conf_env";


const UseGetRealTimeMessage = () => {

    const { authUserData } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const socketio = io(`${conf_env.backendURL}`, {
            query: {
                userId: authUserData._id,
            },
        });
        socketio?.on("newMessage", (newMessage) => {
            dispatch(setLoader(true));
            const conversationUserId = newMessage.senderId === authUserData._id 
                ? newMessage.receiverId 
                : newMessage.senderId;
            
            dispatch(addMessageToConversation({ 
                userId: conversationUserId, 
                message: newMessage 
            }));
            dispatch(setLoader(false));
            // console.log(newMessage);
        });
        return () => socketio?.off("newMessage");
    }, [ dispatch]);
};

export default UseGetRealTimeMessage;