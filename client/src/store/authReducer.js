import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
// import { apiCallBegan } from "./api";

const tokenKey = "token";

const slice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
  },
  reducers: {
    userSignUpRequested: (user, action) => {
      user.loading = true;
    },
    userSignUpReceived: (user, action) => {
      console.log(action);
      user.loading = false;
      localStorage.setItem(tokenKey, action.payload.token);
      window.location = "/";
    },
    userSignUpFailed: (user, action) => {
      user.loading = false;
    },
    currentUserReceived: (user, action) => {
      user.currentUser = action.payload || false;
    },
  },
});

export const {
  userSignUpRequested,
  userSignUpReceived,
  userSignUpFailed,
  currentUserReceived,
} = slice.actions;

export default slice.reducer;

export const signUp = (user) =>
  apiCallBegan({
    url: config.usersUrl,
    method: "post",
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    onSuccess: userSignUpReceived.type,
  });

export const fetchUser = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/current_user");
    dispatch({ type: currentUserReceived.type, payload: res.data });
  } catch (ex) {
    return null;
  }
};

export const getCurrentUser = () => (dispatch, getState) => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    dispatch({ type: currentUserReceived.type, payload: jwtDecode(jwt) });
  } catch (ex) {
    return null;
  }
};
