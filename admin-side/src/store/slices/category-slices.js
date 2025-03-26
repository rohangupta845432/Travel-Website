import { createSlice } from "@reduxjs/toolkit";

const categorySlices = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.items = action.payload;
    },
    addCategory: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    removeCategory: (state, action) => {
      state.items = state.items.filter(
        (category) => category.dbId !== action.payload
      );
    },
    editCategory: (state, action) => {
      const index = state.items.findIndex(
        (cat) => cat.dbId === action.payload.dbId
      );
      if (index !== -1) {
        state.items[index].name = action.payload.name;
        state.items[index].imageUrl = action.payload.imageUrl;
      }
    },
  },
});

export const categoryActions = categorySlices.actions;
export default categorySlices.reducer;
