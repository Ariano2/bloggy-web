import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { _id, firstName, lastName, age, email } = action.payload;
      state.user = { _id, firstName, lastName, age, email };
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
