import { configureStore } from "@reduxjs/toolkit";
import userData from "./userData"
const store = configureStore({
    reducer: {
        data: userData
    }
})

export default store;