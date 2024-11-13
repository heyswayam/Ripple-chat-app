import React, { useEffect, useState } from "react";
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
    const dispatch = useDispatch();
    const { socket } = useSelector((store) => store.socket);
    const [showSidebar, setShowSidebar] = useState(true);
    const [viewportHeight, setViewportHeight] = useState('100dvh');

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

    }, [authUserData, dispatch]);

    useEffect(() => {
        const handleResize = () => {
            const height = window.visualViewport?.height || window.innerHeight;
            setViewportHeight(`${height}px`);
        };

        // Initial height
        handleResize();

        // Listen to viewport changes (handles virtual keyboard)
        window.visualViewport?.addEventListener('resize', handleResize);
        window.visualViewport?.addEventListener('scroll', handleResize);

        return () => {
            window.visualViewport?.removeEventListener('resize', handleResize);
            window.visualViewport?.removeEventListener('scroll', handleResize);
        };
    }, []);

    const handleChatClick = () => {
        setShowSidebar(false);
    };

    const handleBackClick = () => {
        setShowSidebar(true);
    };

    return (
        <div 
            className='flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'
            style={{ height: viewportHeight }}
        >
            <div className={`w-full sm:w-6/12 ${showSidebar ? 'block' : 'hidden'} sm:block`}>
                <Sidebar onChatClick={handleChatClick} />
            </div>
            <div className={`w-full ${showSidebar ? 'hidden' : 'block'} sm:block `}>
                <MessageContainer onBackClick={handleBackClick} />
            </div>
        </div>
    );
};

export default Chat;