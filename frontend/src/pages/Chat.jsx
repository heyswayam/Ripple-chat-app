import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";
import { setOnlineUsers } from "../context/userSlice";
import io from "socket.io-client";
import { setSocket } from "../context/socketSlice";
import conf_env from "../conf_env/conf_env";

const Chat = () => {
    const { authUserData } = useSelector((store) => store.user);
    const { socket } = useSelector((store) => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authUserData) {
            const socketio = io(`${conf_env.backendURL}`, {
                query: {
                    userId: authUserData._id,
                },
            });
            dispatch(setSocket(socketio));

            socketio?.on("getOnlineUsers", (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });
            return () => socketio.close();
        } else {
            if (socket) {
                socket.close();
                dispatch(setSocket(null));
            }
        }
    }, [authUserData,dispatch]);

    return (
        <div className='flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Sidebar />
            <MessageContainer />
        </div>
    );
};

export default Chat;