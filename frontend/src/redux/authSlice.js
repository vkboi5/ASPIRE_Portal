import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false  // false indicates not authenticated by default
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.auth = action.payload;  // Sets authentication status
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
