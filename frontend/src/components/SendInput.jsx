import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addMessageToConversation } from "../context/messageSlice";
import conf_env from "../conf_env/conf_env";

const SendInput = () => {
	const [message, setMessage] = useState("");
	const { authUserData, selectedUser } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const { socket } = useSelector((store) => store.socket);

	// Create a ref to store the timeout ID
	const typingTimeoutRef = useRef(null);

	// Custom debounce function
	const debounceTyping = (callback, delay) => {
		// Clear any existing timeout
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		// Set a new timeout
		typingTimeoutRef.current = setTimeout(callback, delay);
	};

	// Clean up timeout when component unmounts
	useEffect(() => {
		return () => {
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}
		};
	}, []);

	const sendMessage = async () => {
		if (!message.trim() || !selectedUser) return;
		try {
			const senderId = authUserData?._id;
			const receiverId = selectedUser?._id;
			const res = await axios.post(
				`${conf_env.backendURL}/message/send/${senderId}/${receiverId}`,
				{ message },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				},
			);
			const newMessage = res?.data?.data;
			dispatch(
				addMessageToConversation({
					userId: receiverId,
					message: newMessage,
				}),
			);
			dispatch(
				addMessageToConversation({
					userId: senderId,
					message: newMessage,
				}),
			);
		} catch (error) {
			console.error("Error sending message:", error);
		}
		setMessage("");
		// Clear typing indicator immediately when sending
		socket.emit("typing", { receiverId: selectedUser._id, isTyping: false });
		// Clear any pending timeout
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}
	};

	const onInputChange = (e) => {
		setMessage(e.target.value);
		// Emit "typing" immediately
		socket.emit("typing", { receiverId: selectedUser._id, isTyping: true });

		// Set up the debounced "stopped typing" emission
		debounceTyping(() => {
			socket.emit("typing", { receiverId: selectedUser._id, isTyping: false });
		}, 1000); // 1000ms = 1 second delay
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		sendMessage();
	};

	const onClickHandler = (e) => {
		e.preventDefault();
		sendMessage();
	};

	// Clean up typing indicator when user changes or component unmounts
	useEffect(() => {
		return () => {
			if (selectedUser?._id) {
				socket.emit("typing", { receiverId: selectedUser._id, isTyping: false });
			}
		};
	}, [selectedUser, socket]);

	return (
		<form onSubmit={onSubmitHandler}>
			<div className='w-full relative overflow-hidden'>
				<input value={message} type='text' onChange={onInputChange} className='input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 rounded-full pl-4 pr-16' placeholder='Type a message...' disabled={!selectedUser} />
				<button type='button' onClick={onClickHandler} className='btn bg-blue-600 hover:bg-blue-700 text-white absolute right-0 top-0 h-full rounded-r-full px-4' disabled={!selectedUser || !message.trim()}>
					Send
				</button>
			</div>
		</form>
	);
};

export default SendInput;
