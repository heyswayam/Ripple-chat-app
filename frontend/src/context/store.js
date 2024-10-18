import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice";
import loaderSlice from "./loaderSlice";


export const store = configureStore({
	reducer:combineReducers({
        user:userReducer,
        message:messageReducer,
        socket:socketReducer,
        loading:loaderSlice
    }),
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["socket/setSocket"],
                ignoredPaths: ["socket.socket"],
            },
        }),

});