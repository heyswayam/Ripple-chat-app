// import {createSlice} from "@reduxjs/toolkit";

// const messageSlice = createSlice({
//     name:"message",
//     initialState:{
//         messages:[],
//     },
//     reducers:{
//         setMessages:(state,action)=>{
//             state.messages = action.payload;
//         },
//         addMessage: (state, action) => {
//             state.messages.push(action.payload);
//         }
//     }
// });
// export const {setMessages,addMessage} = messageSlice.actions;
// export default messageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    conversations: {}, // Structure: { [userId]: { messages: [], lastFetched: Date } }
  },
  reducers: {
    setConversation: (state, action) => {
      const { userId, messages } = action.payload;
      state.conversations[userId] = {
        messages,
        lastFetched: new Date().toISOString(),
      };
    },
    addMessageToConversation: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.conversations[userId]) {
        state.conversations[userId] = { messages: [], lastFetched: null };
      }
      state.conversations[userId].messages.push(message);
    },
  },
});

export const { setConversation, addMessageToConversation } = messageSlice.actions;
export default messageSlice.reducer;