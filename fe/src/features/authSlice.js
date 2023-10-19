import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isPage: false,
    isRole: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post('https://react-be-theta.vercel.app/login', {
            email: user.email,
            password: user.password,
            role: user.role
        });
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get('https://react-be-theta.vercel.app/me'); 
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});
export const RegisterUser = createAsyncThunk("user/RegisterUser", async (user, thunkAPI) => {
    try {
        if (user.password === user.confPassword) {
          const response = await axios.post("https://react-be-theta.vercel.app/register", {
            // Add the necessary data for user registration, such as name, email, password, etc.
            username: user.username,
            email: user.email,
            password: user.password,
          });

          return response.data;
        }
        const message = "Password dan Confirmation Tidak Cocok";
        return thunkAPI.rejectWithValue(message);
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});
export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete('https://react-be-theta.vercel.app/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState,
        updatePesananDetail: (state, action) => {
            state.jumlahPesananDetail = action.payload;
    },
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.isPage = true;
        });
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
         builder.addCase(RegisterUser.pending, (state) => {
           state.isLoading = true;
         });
         builder.addCase(RegisterUser.fulfilled, (state, action) => {
           state.isLoading = false;
           state.isSuccess = true;
             state.user = action.payload;
             state.message = "Berhasil Membuat Akun";
           state.isPage = true;
         });
         builder.addCase(RegisterUser.rejected, (state, action) => {
           state.isLoading = false;
           state.isError = true;
           state.message = action.payload;
         });

        // Get User Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const { updatePesananDetail } = authSlice.actions;
export const {reset} = authSlice.actions;
export default authSlice.reducer;
