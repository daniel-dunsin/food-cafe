import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category.store";
import mealReducer from "./meal.store";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    meal: mealReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: { extraArgument: [] },
      serializableCheck: false,
      immutableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
