import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bookingActions } from "../../store/slices/booking-slice";
import bookingDummyData from "../../testdata/bookingData";
import useHttp from "../../../../user-side/src/hooks/useHttp";
import { BASE_URL } from "../../../../user-side/src/urls";
const ManageBooking = () => {
  const { isHttpError, isLoding, fetchData } = useHttp();
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

  const handleFetchBookingData = useCallback(
    async (data) => {
      // console.log(data.lenght);
      if (data) {
        const datalist = [];
        const keys = Object.keys(data);
        keys.forEach((key) => {
          datalist.push({ ...data[key], dbId: key });
        });
        console.log(datalist);
        dispatch(bookingActions.setBookings(datalist));
      } else {
        dispatch(bookingActions.setBookings([]));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(`${BASE_URL}booking.json`, {}, handleFetchBookingData);
  }, [fetchData, handleFetchBookingData]);

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

  const handleUpdateStatus = async (dbId, status) => {
    console.log(dbId);
    const handleUpdateFetchData = (data) => {
      dispatch(bookingActions.updateBooking({ dbId, status }));
    };
    fetchData(
      `${BASE_URL}booking/${dbId}.json`,
      {
        method: "PATCH",
        body: { status: status },
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleUpdateFetchData
    );
  };

  return (
    <div className="container mt-4">
      <h2>Manage Bookings</h2>
      {/* <div className="mb-3">
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
      </div> */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Listing</th>
            <th>Email</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Guests</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <div>
                  <h5>{booking.listingName}</h5>
                  <img
                    src={booking.listingImage}
                    className="img-flued"
                    width="80px"
                  />
                </div>
              </td>
              <td>{booking.userEmail}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.guests}</td>
              <td>{booking.address}</td>
              <td>{booking.bookingPrice}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status === "pending" && (
                  <>
                    <button
                      className="btn btn-success btn-sm mr-2"
                      onClick={() =>
                        handleUpdateStatus(booking.dbId, "completed")
                      }
                    >
                      Complete
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleUpdateStatus(booking.dbId, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooking;
