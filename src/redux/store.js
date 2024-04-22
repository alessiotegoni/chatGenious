import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import chatsSlice from './slices/chatsSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chats: chatsSlice,
    },
    devTools: false
})

