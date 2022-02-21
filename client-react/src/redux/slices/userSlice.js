import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: [],
    isLoggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
  },

  reducers: {
    fetchUsers: (state, action) => {
      state.userProfile = action.payload;
    },
    loggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem("loggedIn", state.isLoggedIn);
    },
  },
});

export const { fetchUsers, loggedIn } = userSlice.actions;
export default userSlice.reducer;
