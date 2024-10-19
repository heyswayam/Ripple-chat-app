import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setConversation } from "../context/messageSlice";
import conf_env from "../conf_env/conf_env";

const UseGetMessages = () => {
	const { selectedUser, authUserData } = useSelector((store) => store.user);
	const { conversations } = useSelector((store) => store.message);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchMessages = async () => {
			if (!selectedUser) return;

			const senderId = authUserData?._id;
			const receiverId = selectedUser?._id;

			// Check if we already have recent messages for this conversation
			const existingConversation = conversations[receiverId];
			const isFetchNeeded = !existingConversation || new Date() - new Date(existingConversation.lastFetched) > 60000; // Fetch if last fetch was more than 1 minute ago

			if (isFetchNeeded) {
				try {
					axios.defaults.withCredentials = true;
					const res = await axios.get(`${conf_env.backendURL}/message/get/${senderId}/${receiverId}`);
					dispatch(setConversation({ userId: receiverId, messages: res.data.data }));
				} catch (error) {
					console.log(error.response.data);
					dispatch(setConversation({ userId: receiverId, messages: [] }));
				}
			}
		};

		fetchMessages();
	}, [selectedUser, authUserData, dispatch, conversations]);
};
export default UseGetMessages;



///simplified useGetMessages without optmization// useGetMessages.jsx
// import { useEffect } from 'react';
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { setConversation } from '../context/messageSlice';
// import conf_env from '../conf_env/conf_env';

// const UseGetMessages = () => {
//     const { selectedUser, authUserData } = useSelector(store => store.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchMessages = async () => {
//             if (!selectedUser || !authUserData) return;

//             const senderId = authUserData._id;
//             const receiverId = selectedUser._id;

//             try {
//                 axios.defaults.withCredentials = true;
//                 const res = await axios.get(`${conf_env.backendURL}/message/get/${senderId}/${receiverId}`);
//                 dispatch(setConversation({ userId: receiverId, messages: res.data.data }));
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//                 dispatch(setConversation({ userId: receiverId, messages: [] }));
//             }
//         };

//         fetchMessages();
//     }, [selectedUser, authUserData, dispatch]);
// };

// export default UseGetMessages;

