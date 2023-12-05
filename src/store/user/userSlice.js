import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import {jwtDecode} from 'jwt-decode';


export const loginUser = createAsyncThunk('user/loginUser',
async (payload, thunkApi)=>{
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, payload);
        localStorage.setItem('token', res.data.token);
        return jwtDecode(res.data.token)
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const createUser = createAsyncThunk('user/createUser', 
    async (payload, thunkApi) =>{
        try {
            const res = await axios.post(`${BASE_URL}/auth/registration`, payload);
            localStorage.setItem('token', res.data.token)                 
            return jwtDecode(res.data.token);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.response.data.message)
        }
})

export const checkUser = createAsyncThunk('user/checkUser', 
    async (_, thunkApi) =>{
        try {
            const token = localStorage.getItem('token')
            if(!token){
                console.log('none');
                return null;
            }
            const res = await axios(`${BASE_URL}/auth`, {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.setItem('token', res.data.token)
            return jwtDecode(res.data.token);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
})

const initialState = {
    currentUser:null,
    isAuth: false,
    status: null,
    error: null,    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.cart = [];
            state.currentUser = null;
            state.isAuth = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending, (state, action)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(createUser.fulfilled, (state, action)=>{
            state.status = 'resolved';
            state.currentUser = action.payload;
            state.isAuth = true;            
        })
        .addCase(createUser.rejected, (state, action)=>{
            state.status = 'resolved';
            state.currentUser = action.payload;            
        })
        .addCase(loginUser.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.status = 'resolved';
            state.currentUser = action.payload;
            state.isAuth = true;
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.status = 'resolved';
            state.error = action.payload
        })
        .addCase(checkUser.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(checkUser.fulfilled, (state, action)=>{
            state.currentUser = action.payload;
            state.isAuth = true;
            if (action.payload) {
                state.status = 'resolved';
                state.currentUser = action.payload;
                state.isAuth = true;
            } else {
            state.status = 'resolved';
            state.isAuth = false;
            }
        })
        .addCase(checkUser.rejected, (state, action)=>{
            state.status = 'resolved';
            state.error = action.payload;
            state.isAuth = false;
        })
    }
})
export const {logOut} = userSlice.actions;

export default userSlice.reducer;