import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  shortLoading,
  loginLoading,
  getLoading,
  setLink,
  multiLoading,
} from "./shortLinkReducers";
import {
  generateShortLinks,
  fetchLinks,
  saveLink,
  saveMulti,
} from "./shortLinkService";

export const showLinks = createAsyncThunk<void, string[]>(
  "show/links",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(getLoading(true));
      const links = await fetchLinks();
      thunkAPI.dispatch(setLink(links));
      thunkAPI.dispatch(getLoading(false));
    } catch (error) {
      thunkAPI.dispatch(getLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);
export const generateShortLink = createAsyncThunk<void, string>(
  "generate/generateShortLink",
  async (url, thunkAPI) => {
    try {
      thunkAPI.dispatch(shortLoading(true));
      const newUrl = await generateShortLinks(url);
      await saveLink(url, newUrl);
      //   const phoneNumbers = await generatePhoneNumbers(country);
      thunkAPI.dispatch(shortLoading(false));
      thunkAPI.dispatch(showLinks([]));
    } catch (error) {
      thunkAPI.dispatch(shortLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);

export const generateShortMulti = createAsyncThunk<void, any[]>(
  "generate/generateShortMulti",
  async (form, thunkAPI) => {
    try {
      thunkAPI.dispatch(multiLoading(true));
      const idDoc = await saveMulti(form);
      const url = window.location.href + "detail/" + idDoc;
      const newUrl = await generateShortLinks(url);
      await saveLink(url, newUrl);
      thunkAPI.dispatch(multiLoading(false));
      thunkAPI.dispatch(showLinks([]));
    } catch (error) {
      thunkAPI.dispatch(multiLoading(false));
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
