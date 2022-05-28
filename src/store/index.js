import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authentication";
import moduleReducer from "./module";

const store = configureStore({
  reducer: {
    auth: authReducer,
    module: moduleReducer,
  },
});

export default store;
