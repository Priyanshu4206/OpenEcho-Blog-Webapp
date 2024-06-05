import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, //user not authenticated
  userData: null,
};

// creating the slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
    },
  },
});
// Going to be used to pass on in the configuration of the redux store
export default authSlice.reducer;

// Going to be used during the login and logout functionalities
export const { login, logout } = authSlice.actions;
