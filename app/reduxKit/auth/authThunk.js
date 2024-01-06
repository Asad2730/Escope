import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const signUp = createAsyncThunk('auth/signUp',(userData)=>{
  try{
    const { data } = axios.postForm('auth/signup',userData);
    return data;
  }catch(error){
    return thunkAPI.rejectWithValue(ex.response?.data || ex.message);
  }
})


export const loginWithFaceID = createAsyncThunk('auth/loginWithFaceID', (userData)=>{
    try{
    const { data } = axios.post('',userData);
    return data;
    }catch (error) {
      return thunkAPI.rejectWithValue(ex.response?.data || ex.message);
      }
})




export const loginWithEmailPassword = createAsyncThunk('auth/loginWithEmailPassword',(userData)=>{
  try{
    const { data } = axios.postForm('auth/loginWithEmailPassword',userData);
    return data;
  }catch(error){
    return thunkAPI.rejectWithValue(ex.response?.data || ex.message);
  }
})
