import React, { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers, setSelectedUser, logout } from "../context/userSlice";
import { setMessages } from "../context/messageSlice";
import OtherUserList from "./OtherUserList";
import conf_env from "../conf_env/conf_env";

const Sidebar = ({ onChatClick }) => {
	const [search, setSearch] = useState("");
	const { otherUsers } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			const res = await axios.post(`${conf_env.backendURL}/user/logout`);
			navigate("/signin");
			dispatch(logout());
			toast.success(res.data.message);
			dispatch(setMessages([]));
			dispatch(setOtherUsers(null));
			dispatch(setSelectedUser(null));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (search === "") {
			// Fetch all users when search is cleared
			const fetchAllUsers = async () => {
				try {
					const res = await axios.get(`${conf_env.backendURL}/user/other-users`);
					dispatch(setOtherUsers(res.data.data));
				} catch (error) {
					console.log(error);
				}
			};
			fetchAllUsers();
		} else {
			// Filter users based on search input
			const filteredUsers = otherUsers?.filter((user) => user.fullname.toLowerCase().includes(search.toLowerCase()));
			dispatch(setOtherUsers(filteredUsers));
		}
	}, [search, dispatch]);

	return (
		<div className='border-r border-slate-500 p-4 flex flex-col h-full bg-gray-900 transition-all duration-300 ease-in-out'>
			<div className='flex items-center gap-2 mb-4'>
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 rounded-full pl-4 pr-10 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500'
					type='text'
					placeholder='Search...'
				/>
			</div>
			<div className='flex-1 overflow-auto'>
				<OtherUserList onChatClick={onChatClick} />
			</div>
			<div className='mt-4'>
				<button onClick={logoutHandler} className='btn bg-red-600 hover:bg-red-700 text-white w-full rounded-full py-2 transition-all duration-300 ease-in-out'>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
