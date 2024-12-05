import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

export const postSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      const { chats } = action.payload;
      state.chats = chats;
    },
    addNewChat: (state, action) => {
      const { newChat } = action.payload;

      state.chats.push(newChat);
    },
    saveMessage: (state, action) => {
      const { chatId, newMsg } = action.payload;

      const chatIndex = state.chats.findIndex((c) => c._id === chatId);

      if (chatIndex === -1) return;

      console.log(action.payload);

      const chat = state.chats[chatIndex];

      chat.messages.push(newMsg);

      if (newMsg.isErrorMsg && chat.messages.length > 1 && newMsg.remove) {
        chat.messages = chat.messages.filter((m) => !m.remove && !m.isErrorMsg);
        console.log(chat.messages);
      }
    },
    deleteChats: (state, action) => {
      const { chatId, type } = action.payload;

      switch (type) {
        case "BY_ID":
          state.chats = [...state.chats.filter((c) => c._id !== chatId)];

          break;
        case "ALL":
          state.chats = [];

          break;
        default:
          console.log(`${type} isn't allowed`);
          break;
      }
    },
    deleteChatMsgs: (state, action) => {
      const { chatId } = action.payload;

      const chat = state.chats.find((c) => c._id === chatId);

      chat.messages = [];
    },
  },
});

export const {
  setChats,
  addNewChat,
  saveMessage,
  deleteChats,
  deleteChatMsgs,
} = postSlice.actions;

export const getUserChats = (state) => state.chats.chats;

export default postSlice.reducer;
