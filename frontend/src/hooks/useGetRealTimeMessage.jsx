import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageToConversation } from "../context/messageSlice";
import { setLoader } from "../context/loaderSlice";

const UseGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { authUserData } = useSelector(store => store.user);
    const dispatch = useDispatch();

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
            // console.log(newMessage);
        });
        return () => socket?.off("newMessage");
    }, [socket, dispatch]);
};

export default UseGetRealTimeMessage;