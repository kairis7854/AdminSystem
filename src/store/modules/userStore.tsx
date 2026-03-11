import { createSlice } from '@reduxjs/toolkit'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userInfo: {}
  },
  reducers: {}
})



export default userStore.reducer