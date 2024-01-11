import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const db_url = 'http://192.168.0.147:3000'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};


export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, faceId }, thunkAPI) => {
    try {
     
      let form_data = new FormData();
     
      form_data.append('email', email);
      form_data.append('password', password);
      form_data.append('face_id', {
        uri: faceId,
        name: `${email}.jpg`,
        type: 'image/jpg',
      });

      const { data } = await axios.post(`${db_url}/createUser`, form_data, config);
    
      return data;
    } catch (error) {
      console.log('err',error)
      console.log('err',error.response?.data)
      console.log('err',error.message)
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginWithFaceID = createAsyncThunk(
  'auth/loginWithFaceID',
  async ({ email, faceId }, thunkAPI) => {
    try {
      let form_data = new FormData();

      form_data.append('email', email);
      form_data.append('faceId', {
        uri: faceId,
        name: 'photo.jpg',
        type: 'image/jpg',
      });

      const { data } = await axios.post(`${db_url}/LoginWithFaceID`, form_data, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginWithEmailPassword = createAsyncThunk(
  'auth/loginWithEmailPassword',
  async ({ email, password }, thunkAPI) => {
    try {
      let obj = { email, password };
      const { data } = await axios.post(`${db_url}/LoginWithEmailPassword`, obj);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
