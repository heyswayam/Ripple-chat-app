import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		authStatus: !!localStorage.getItem('authUserData'),
		authUserData: JSON.parse(localStorage.getItem('authUserData')),
		otherUsers: null,
		selectedUser: null,
		onlineUsers: null,
	},
	reducers: {
		login: (state, action) => {
			state.authStatus = true;
			state.authUserData = action.payload;
			localStorage.setItem('authUserData', JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.authStatus = false;
			state.authUserData = null;
			localStorage.removeItem('authUserData');
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
// export const {	login,logout } = userSlice.actions;
export default userSlice.reducer;
