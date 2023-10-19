import { configureStore } from "@reduxjs/toolkit";
import shortLInkReducers from "./shortLink/shortLinkReducers";
const store = configureStore({
  reducer: { generate: shortLInkReducers },
});

export default store;
