import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal, MealSlice } from "../types";
import { getMealById, getMealsByCategory } from "../services";

const initialState: MealSlice = {
  meals: [],
  singleMeal: undefined,
  handlers: { isLoading: false },
};

const mealSlice = createSlice({
  name: "mealSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMealsByCategory.pending, (state) => {
        state.handlers.isLoading = true;
      })
      .addCase(getMealsByCategory.fulfilled, (state, action: PayloadAction<Meal[]>) => {
        state.meals = action.payload;
        state.handlers.isLoading = false;
      })
      .addCase(getMealsByCategory.rejected, (state) => {
        state.handlers.isLoading = false;
      })
      .addCase(getMealById.pending, (state) => {
        state.handlers.isLoading = true;
      })
      .addCase(getMealById.fulfilled, (state, action: PayloadAction<Meal | undefined>) => {
        state.handlers.isLoading = false;
        state.singleMeal = action.payload;
      })
      .addCase(getMealById.rejected, (state) => {
        state.handlers.isLoading = false;
      });
  },
});

const mealReducer = mealSlice.reducer;
export const {} = mealSlice.actions;
export default mealReducer;
