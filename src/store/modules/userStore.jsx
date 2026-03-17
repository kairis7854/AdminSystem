import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../firebase.js';

//登入
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    //firebase 接收 email當作帳號，故轉成email送出
    const firebaseEmail = `${email}@AdminSystem.com`
    try {
      const userCredential = await signInWithEmailAndPassword(auth, firebaseEmail, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userId = user.email.split('@')[0]
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      return {
        token: token,
        userId: userId,
        // email: user.email,
        isAuthenticated: true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//登出
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userStore = createSlice({
  name: 'user',
  initialState: {
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //登入
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //登出
      .addCase(logoutUser.fulfilled, (state) => {
        state.userId = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });

  },
});
export const { logout } = userStore.actions;
export default userStore.reducer;