import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/userStore.tsx' 

const store = configureStore({
  reducer: {
    user: userReducer 
  }
})

export default store
