import {createAsyncThunk} from "@reduxjs/toolkit";


export const register = createAsyncThunk(
    'SN/AUTH/REGISTER',
    async (_, thunkAPI) => {
        try { 
            

        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)
