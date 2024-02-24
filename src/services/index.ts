import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../axios.config";
import { Category, Meal } from "../types";

export const getCategories: any = createAsyncThunk("getcategories", async (_, thunkApi) => {
  try {
    const response = await http.get<{ categories: Category[] }>(`/categories.php`);

    return response?.data?.categories;
  } catch (error: any) {
    console.error(error);
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getMealsByCategory: any = createAsyncThunk("getmealsbycategory", async (category: string, thunkApi) => {
  try {
    const response = await http.get<{ meals: Meal[] }>(`/filter.php?c=${category ?? "Beef"}`);

    return response?.data?.meals;
  } catch (error: any) {
    console.error(error);
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getMealById: any = createAsyncThunk("getMealById", async (id: string, thunkApi) => {
  try {
    const response = await http.get<{ meals: Meal[] }>(`/lookup.php?i=${id}`);

    return response?.data?.meals?.[0];
  } catch (error: any) {
    console.error(error);
    return thunkApi.rejectWithValue(error.message);
  }
});
