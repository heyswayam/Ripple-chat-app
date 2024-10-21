import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		authStatus: false,
		authUserData: null,
		otherUsers: null,
		selectedUser: null,
		onlineUsers: null,
	},
	reducers: {
		login: (state, action) => {
			state.authStatus = true;
			state.authUserData = action.payload;
		},
		logout: (state) => {
			state.authStatus = false;
			state.authUserData = null;
		},

		//setAuthUser not required
		setOtherUsers: (state, action) => {
			state.otherUsers = action.payload;
		},
		setSelectedUser: (state, action) => {
			state.selectedUser = action.payload;
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload;
		},
	},
});
export const { setOtherUsers, setSelectedUser, setOnlineUsers, login, logout } = userSlice.actions;
export default userSlice.reducer;
