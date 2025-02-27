import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://react-be-theta.vercel.app"; // Simpan base URL untuk mempermudah

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isPage: false,
  isRole: false,
  message: "",
};

// ✅ Login User
export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: user.email,
      password: user.password,
    }, { withCredentials: true }); // 🔥 Wajib agar cookie session tersimpan

    // ✅ Simpan UUID ke localStorage
    if (response.data?.uuid) {
      localStorage.setItem("uuid", response.data.uuid);
    }

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || "Login gagal");
  }
});


// ✅ Get User Info (Cek session)
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const uuid = localStorage.getItem("uuid") || ""; // 🔥 Ambil UUID dari localStorage (opsional)

    const response = await axios.get(`${API_URL}/me`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${uuid}`, // ✅ Kirim UUID di Headers (jika perlu)
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || "Tidak dapat mengambil data user");
  }
});


// ✅ Register User
export const RegisterUser = createAsyncThunk("user/RegisterUser", async (user, thunkAPI) => {
  try {
    if (user.password !== user.confPassword) {
      return thunkAPI.rejectWithValue("Password dan Konfirmasi Password tidak cocok");
    }

    const response = await axios.post(`${API_URL}/register`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || "Registrasi gagal");
  }
});

// ✅ Logout User
export const LogOut = createAsyncThunk("user/LogOut", async (_, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/logout`, { withCredentials: true }); // 🔥 Pastikan session terhapus
    localStorage.setItem("uuid", '');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || "Logout gagal");
  }
});

// ✅ Redux Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState, // Reset ke state awal
    updatePesananDetail: (state, action) => {
      state.jumlahPesananDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🚀 Handle Login
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isPage = true;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🚀 Handle GetMe (Cek Session)
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🚀 Handle Register
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Berhasil Membuat Akun";
        state.isPage = true;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🚀 Handle Logout
      .addCase(LogOut.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.isLoading = false;
        state.isPage = false;
        state.message = "Berhasil Logout";
      });
  },
});

export const { updatePesananDetail, reset } = authSlice.actions;
export default authSlice.reducer;
