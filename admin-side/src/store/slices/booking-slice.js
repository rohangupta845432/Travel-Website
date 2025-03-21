import { createSlice } from "@reduxjs/toolkit";

const bookingSlices = createSlice({
  name: "booking",
  initialState: {
    items: [],
  },
  reducers: {
    setBookings: (state, action) => {
      state.items = action.payload;
    },
    addNewBooking: (state, action) => {
      state.items.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.items.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.items[index].status = action.payload.status;
      }
    },
  },
});

export const bookingActions = bookingSlices.actions;
export default bookingSlices.reducer;
