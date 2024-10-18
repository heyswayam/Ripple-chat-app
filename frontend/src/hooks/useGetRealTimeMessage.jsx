import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, setMessages } from "../context/messageSlice";
import useGetRealTimeMessage from "./useGetRealTimeMessage";

const UseGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            // dispatch(setMessages(prevMessages => [...prevMessages, newMessage]));
            dispatch(addMessage(newMessage));
            console.log(newMessage);
            console.log("hello")
        });
        return () => socket?.off("newMessage");
    }, [socket, dispatch]);
};

export default UseGetRealTimeMessage;
