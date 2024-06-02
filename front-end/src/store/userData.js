import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'userData',
    initialState: {
        userDetail: {}
    },
    reducers: {
        addUser: (state, action) => {
            state.userDetail = action.payload;
        }
    }
})

export const { addUser } = slice.actions
export default slice.reducer;