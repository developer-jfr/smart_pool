
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { register } from "./action";


interface AuthState {
    
}

const initialState: AuthState = {
    
}


export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export default authSlice.reducer;
