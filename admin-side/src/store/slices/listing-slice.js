import { createSlice } from "@reduxjs/toolkit";

const listingsSlice = createSlice({
  name: "listing",
  initialState: {
    items: [],
  },
  reducers: {
    setListings: (state, action) => {
      state.items = action.payload;
    },
    removeListing: (state, action) => {
      state.items = state.items.filter(
        (listing) => listing.dbId !== action.payload
      );
    },
    editListing: (state, action) => {
      const index = state.items.findIndex(
        (listing) => listing.dbId === action.payload.dbId
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    addNewListing: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const listingActions = listingsSlice.actions;
export default listingsSlice.reducer;
