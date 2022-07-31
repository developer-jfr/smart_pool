import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface TransactionState {
    error: string
    publicKey: string
    signature: string
    isPaid: boolean
}

const initialState: TransactionState = {
    error: '',
    publicKey: '',
    signature: '',
    isPaid: false
}


export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setPublickKey(state, action:PayloadAction<string>) {
            state.publicKey = action.payload
        },
        setSignature(state, action:PayloadAction<string>) {
            state.signature = action.payload
        },
        setIsPaid(state, action:PayloadAction<boolean>) {
            state.isPaid = action.payload
        }
    },
})

export default transactionSlice.reducer;
