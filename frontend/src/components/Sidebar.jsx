import React, { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers, setSelectedUser, logout } from "../context/userSlice";
import { setConversation } from "../context/messageSlice";
import OtherUserList from "./OtherUserList";
import conf_env from "../conf_env/conf_env";
import { setLoader } from "../context/loaderSlice";
import { PulseLoader } from "react-spinners";

const Sidebar = ({ onChatClick }) => {
	const authUserData = useSelector((store) => store.user.authUserData);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const { otherUsers } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutHandler = async () => {
		try {
			setLoading(true);
			const res = await axios.post(`${conf_env.backendURL}/user/logout`);
			navigate("/signin");
			dispatch(logout());
			toast.success("Logged out successfully");
			// dispatch(setMessages([]));
			dispatch(setConversation({ userId: [], messages: [] }));
			dispatch(setOtherUsers(null));
			dispatch(setSelectedUser(null));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
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
			const filteredUsers = otherUsers?.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));
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
					placeholder='Search by username...'
				/>
			</div>
			<div className='flex-1 overflow-auto'>
				<OtherUserList onChatClick={onChatClick} />
			</div>
			<div className='mt-4 flex items-center justify-between gap-4'>
				<div className="flex items-center max-w-xs w-36 justify-between">
				<img src={authUserData.profilePhoto} alt="User Avatar" className='w-10 h-10 rounded-full' />
				<div className="flex flex-col mr-3">
				<span className='text-white text-base font-medium'>{authUserData.fullname}</span>
				<span className='text-white text-xs'> @{authUserData.username}</span>
				</div>
				</div>
				<button onClick={logoutHandler} className='btn bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 transition-all duration-300 ease-in-out w-fit px-4'>
					{loading === false ? (
						"Logout"
					) : (
						<>
							<PulseLoader color='#f3f4f6' size={7} />
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
