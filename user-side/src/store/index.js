import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import categoryReducer from "./slices/category-slices";
import listingReducer from "./slices/listing-slice";
import bookingReducer from "./slices/booking-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    listing: listingReducer,
    booking: bookingReducer,
  },
});

export default store;
