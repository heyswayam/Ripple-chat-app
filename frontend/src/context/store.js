import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import loaderSlice from "./loaderSlice";
import socketReducer from "./socketSlice";


export const store = configureStore({
	reducer:combineReducers({
        user:userReducer,
        message:messageReducer,
        loading:loaderSlice,
        socket: socketReducer
        
    }),
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["socket/setSocket"],
                ignoredPaths: ["socket.socket"],
            },
        }),

});