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

// right now, my app works correctly when fetching data from database.but there is some issue in the socket part preventing real time chatting

// like when I open 2 instance, it loads the messages for both the users. Only when I hit enter to send message (lets say from user 1) then the user2 instance throws an error saying

// "messages.map is not a function

// MessageList@http://localhost:5173/src/components/MessageList.jsx?t=1729281939956:28:117

// "

// when I checked the redux toolkit, it shows

// this piece of code "dispatch(setMessages(prevMessages => [...prevMessages, newMessage]));" from useGetRealTimeMessage.jsx is setting the messages context to empty array.

// when I comment this code, i dont get any error but again cant do the real time chat 
