import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authentication";
import cardListReducer from "./card-list";
import moduleReducer from "./module";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cardList: cardListReducer,
    module: moduleReducer
  },
});

export default store;
