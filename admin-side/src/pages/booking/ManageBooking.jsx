import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bookingActions } from "../../store/slices/booking-slice";
import bookingDummyData from "../../testdata/bookingData";
const ManageBooking = () => {
  const dispatch = useDispatch();
  const { items: bookings } = useSelector((state) => state.booking);
  const [bookingData, setBookingData] = useState({
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    address: "",
    status: "pending",
  });

  useEffect(() => {
    // const loadBookings = async () => {
    //   const bookingData = await fetchBookings();
    dispatch(bookingActions.setBookings(bookingDummyData));
    // };
    // loadBookings();
  }, [dispatch]);

  const handleAddBooking = async () => {
    if (
      !bookingData.email ||
      !bookingData.checkIn ||
      !bookingData.checkOut ||
      !bookingData.guests ||
      !bookingData.address
    )
      return;
    // const newBooking = await addBooking(bookingData);
    // if (newBooking) {
    dispatch(bookingActions.addNewBooking({ ...bookingData, id: Date.now() }));
    setBookingData({
      email: "",
      checkIn: "",
      checkOut: "",
      guests: "",
      address: "",
      status: "pending",
    });
    // }
  };

  const handleUpdateStatus = async (id, status) => {
    // const updatedBooking = await updateBookingStatus(id, status);
    // if (updatedBooking) {
    dispatch(bookingActions.updateBooking({ id, status }));
    // }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Bookings</h2>
      <div className="mb-3">
        <input
          type="email"
          placeholder="User Email"
          value={bookingData.email}
          onChange={(e) =>
            setBookingData({ ...bookingData, email: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="date"
          placeholder="Check-in Date"
          value={bookingData.checkIn}
          onChange={(e) =>
            setBookingData({ ...bookingData, checkIn: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="date"
          placeholder="Check-out Date"
          value={bookingData.checkOut}
          onChange={(e) =>
            setBookingData({ ...bookingData, checkOut: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Number of Guests"
          value={bookingData.guests}
          onChange={(e) =>
            setBookingData({ ...bookingData, guests: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={bookingData.address}
          onChange={(e) =>
            setBookingData({ ...bookingData, address: e.target.value })
          }
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={handleAddBooking}>
          Add Booking
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Guests</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.email}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.guests}</td>
              <td>{booking.address}</td>
              <td>{booking.status}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  onClick={() => handleUpdateStatus(booking.id, "completed")}
                >
                  Complete
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleUpdateStatus(booking.id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooking;
