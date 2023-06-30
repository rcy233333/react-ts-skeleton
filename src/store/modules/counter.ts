import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'hello-redux-slice'
  },
  reducers: {}
})

export default counterSlice.reducer
