import { configureStore } from "@reduxjs/toolkit";

import dogInfoReducer from "./slices/dogInfo";

const store = configureStore({
  reducer: { dogInfo: dogInfoReducer },
});
export default store;
