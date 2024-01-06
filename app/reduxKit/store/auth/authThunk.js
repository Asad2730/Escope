import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const signUp = createAsyncThunk('auth/signUp',(userData)=>{
  try{
    const { data } = axios.postForm('auth/signup',userData);
    return data;
  }catch(error){
    throw error.response ? error.response.data : error.message || 'An error occurred';
  }
})


export const loginWithFaceID = createAsyncThunk('auth/loginWithFaceID', (userData)=>{
    try{
    const { data } = axios.post('',userData);
    return data;
    }catch (error) {
        throw error.response ? error.response.data : error.message || 'An error occurred';
      }
})




export const loginWithEmailPassword = createAsyncThunk('auth/loginWithEmailPassword',(userData)=>{
  try{
    const { data } = axios.postForm('auth/loginWithEmailPassword',userData);
    return data;
  }catch(error){
    throw error.response ? error.response.data : error.message || 'An error occurred';
  }
})
