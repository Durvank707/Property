import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error: null,
    currentUser: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true;
        },
        signInSuccess: (state, action)=>{
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure: (state, action) =>{
            state.error = action.payload;
            state.loading= false;
        },
        updateUserStarts:(state)=>{
            state.loading = true;
        },
        updateUserSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        }, 
        updateUserFailure: (state, action) =>{
            state.error = action.payload;
            state.loading= false;
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, updateUserFailure, updateUserSuccess, updateUserStarts} = userSlice.actions;

export default userSlice.reducer; 