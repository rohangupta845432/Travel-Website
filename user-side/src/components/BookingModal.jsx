import { useState } from "react";
const BookingModal = ({ listing }) => {
  const [bookingData, setBookingData] = useState({
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    address: "",
  });

  return (
    <div className="card">
      <div className="card-body">
        <h4>Book Your Stay</h4>
        <input
          type="email"
          placeholder="Your Email"
          className="form-control mb-2"
          value={bookingData.email}
          onChange={(e) =>
            setBookingData({ ...bookingData, email: e.target.value })
          }
        />
        <input
          type="date"
          className="form-control mb-2"
          value={bookingData.checkIn}
          onChange={(e) =>
            setBookingData({ ...bookingData, checkIn: e.target.value })
          }
        />
        <input
          type="date"
          className="form-control mb-2"
          value={bookingData.checkOut}
          onChange={(e) =>
            setBookingData({ ...bookingData, checkOut: e.target.value })
          }
        />
        <input
          type="number"
          className="form-control mb-2"
          min="1"
          value={bookingData.guests}
          onChange={(e) =>
            setBookingData({ ...bookingData, guests: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Your Address"
          className="form-control mb-2"
          value={bookingData.address}
          onChange={(e) =>
            setBookingData({ ...bookingData, address: e.target.value })
          }
        />
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-success"
            onClick={() => onBook(bookingData)}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
