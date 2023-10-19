import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  shortLoading,
  loginLoading,
  getLoading,
  setLink,
} from "./shortLinkReducers";
import { generateShortLinks, fetchLinks } from "./shortLinkService";
export const generateShortLink = createAsyncThunk<void, string>(
  "generate/generateShortLink",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(shortLoading(true));
      //   const phoneNumbers = await generatePhoneNumbers(country);
      thunkAPI.dispatch(shortLoading(false));
    } catch (error) {
      thunkAPI.dispatch(shortLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);

export const showLinks = createAsyncThunk<void, string[]>(
  "show/links",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoading(true));
      const links = fetchLinks();
      thunkAPI.dispatch(setLink(links));
      thunkAPI.dispatch(getLoading(false));
    } catch (error) {
      thunkAPI.dispatch(getLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);

export const generateShortMulti = createAsyncThunk<void, string>(
  "generate/generateShortMulti",
  async (link, thunkAPI) => {
    try {
      thunkAPI.dispatch(shortLoading(true));
      await generateShortLinks(link);
      thunkAPI.dispatch(shortLoading(false));
    } catch (error) {
      thunkAPI.dispatch(shortLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);

export const LoginIn = createAsyncThunk<void, string>(
  "generate/generateNumbers",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(loginLoading(true));
      //   const phoneNumbers = await generatePhoneNumbers(country);

      thunkAPI.dispatch(loginLoading(false));
    } catch (error) {
      thunkAPI.dispatch(loginLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);
