import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		authStatus: false,
		userData: null,
		// authUser: null,
		// otherUsers: null,
		// selectedUser: null,
		// onlineUsers: null,
	},
	reducers: {
		login: (state, action) => {
            state.authStatus = true;
            state.userData = action.payload;

        },
        logout: (state) => {
            state.authStatus = false;
            state.userData = null;

        },
		// setAuthUser: (state, action) => {
		// 	state.authUser = action.payload;
		// },
		// setOtherUsers: (state, action) => {
		// 	state.otherUsers = action.payload;
		// },
		// setSelectedUser: (state, action) => {
		// 	state.selectedUser = action.payload;
		// },
		// setOnlineUsers: (state, action) => {
		// 	state.onlineUsers = action.payload;
		// },
	},
});
// export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers,login,logout } = userSlice.actions;
export const {	login,logout } = userSlice.actions;
export default userSlice.reducer;
