import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bookingActions } from "../../store/slices/booking-slice";
// import bookingDummyData from "../../testdata/bookingData";
const ManageBooking = () => {
  const dispatch = useDispatch();
  const { userEmail: myEmail } = useSelector((state) => state.auth);
  const { items: bookings } = useSelector((state) => state.booking);
  const myBookings = bookings.filter(
    (booking) => booking.userEmail === myEmail
  );
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "badge bg-warning";
      case "completed":
        return "badge bg-success";
      case "rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };
  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>

      {myBookings.map((booking) => (
        <div
          key={booking.dbId}
          className="row align-items-center mb-3 border p-3"
        >
          <div className="col-md-2">
            <h5 className="fw-bold">{booking.listingName}</h5>
            <img
              src={booking.listingImage}
              alt={booking.listingName}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <div className="">
              <div>
                <p>
                  <b>{booking.userEmail}</b>
                </p>
                <i>{booking.address}</i>
              </div>

              <span>
                <b>
                  {booking.checkIn} - {booking.checkOut}
                </b>
              </span>
              <span>{booking.guests} Guest(s)</span>
            </div>
          </div>
          <div className="col-md-2">
            <h4>₹{booking.bookingPrice}</h4>
          </div>
          <div className="col-md-2">
            <span className={getStatusBadge(booking.status)}>
              {booking.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageBooking;
