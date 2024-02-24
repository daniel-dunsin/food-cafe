import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategorySlice } from "../types";
import { getCategories } from "../services";

const initialState: CategorySlice = {
  categories: [],
  activeCategory: undefined,
  handlers: { isLoading: false },
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    selectActiveCategory: (state, action: PayloadAction<Category>) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        state.handlers.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.handlers.isLoading = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.handlers.isLoading = false;
      });
  },
});

const categoryReducer = categorySlice.reducer;
export const { selectActiveCategory } = categorySlice.actions;
export default categoryReducer;
