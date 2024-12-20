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

	const handleChatClick = () => {
		setShowSidebar(false);
	};

	const handleBackClick = () => {
		setShowSidebar(true);
	};

	return (
		<div className='flex h-[100dvh] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<div className={`w-full sm:w-6/12 ${showSidebar ? "block" : "hidden"} sm:block`}>
				<Sidebar onChatClick={handleChatClick} />
			</div>
			<div className={`w-full ${showSidebar ? "hidden" : "block"} sm:block `}>
				<MessageContainer onBackClick={handleBackClick} />
			</div>
		</div>
	);
};

export default Chat;
