import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "short",
  initialState: {
    shortLoading: false,
    loginLoading: false,
    multiLoading: false,
    showLoading: false,
    links: [],
  },
  reducers: {
    shortLoading: (state, actions) => {
      state.shortLoading = actions.payload;
    },
    loginLoading: (state, actions) => {
      state.loginLoading = actions.payload;
    },
    multiLoading: (state, actions) => {
      state.multiLoading = actions.payload;
    },

    getLoading: (state, actions) => {
      state.showLoading = actions.payload;
    },

    setLink: (state, actions) => {
      state.links = actions.payload;
    },
  },
});

export const { shortLoading, loginLoading, getLoading, multiLoading, setLink } =
  generateSlice.actions;

export default generateSlice.reducer;
