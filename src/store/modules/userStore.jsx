import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.js';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      return {
        token,
        // uid: user.uid,
        email: user.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userStore = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null, 
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = userStore.actions;
export default userStore.reducer;