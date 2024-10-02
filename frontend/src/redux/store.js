import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Ensure the path is correct

const store = configureStore({
    reducer: {
        auth: authReducer  // 'auth' will be the key to access parts of the state
    },
});

export default store;
