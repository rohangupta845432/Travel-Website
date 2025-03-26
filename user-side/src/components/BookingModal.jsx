import { useState } from "react";
import useHttp from "../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../store/slices/booking-slice";
import { BASE_URL } from "../urls";
import { Link } from "react-router-dom";
import LodingFroBtn from "./UI/LodingFroBtn";
import SuccessCheckAnimation from "./UI/SuccessCheckAnimation";
const BookingModal = ({ listing }) => {
  const { isLoding, httpError, fetchData } = useHttp();
  const [formSuccess, setFormSuccess] = useState(false);
  const dispatch = useDispatch();
  const myEmail = useSelector((state) => state.auth.userEmail);
  // console.log(listing);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    address: "",
  });

  const onBook = (e, formData) => {
    e.preventDefault();

    const handleAddBooking = (data) => {
      console.log(data);
      dispatch(
        bookingActions.addNewBooking({
          ...formData,
          userEmail: myEmail,
          status: "pending",
          dbId: data.name,
          bookingPrice: listing.price,
          listingName: listing.name,
          listingId: listing.id,
          listingDbId: listing.dbId,
          listingImage: listing.image1,
        })
      );
      setBookingData({
        checkIn: "",
        checkOut: "",
        guests: 1,
        address: "",
      });
      setFormSuccess(true);
    };
    console.log(formData);
    fetchData(
      `${BASE_URL}booking.json`,
      {
        method: "POST",
        body: {
          ...formData,
          userEmail: myEmail,
          status: "pending",
          bookingPrice: listing.price,
          listingName: listing.name,
          listingId: listing.id,
          listingDbId: listing.dbId,
          listingImage: listing.image1,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleAddBooking
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="text-center color-primary">Book Your Stay</h4>
      </div>
      <div className="card-body">
        {formSuccess ? (
          <div style={{ textAlign: "center" }}>
            <SuccessCheckAnimation message="Booking Successful" />
            <Link className="btn btn-success" to="/bookings">
              Check Your Bookings
            </Link>
          </div>
        ) : (
          <div>
            {httpError ? <p>{httpError}</p> : ""}
            <form onSubmit={(e) => onBook(e, bookingData)}>
              <div className="form-group">
                <label className="form-label">Check-In Date</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="Check-In Date"
                  value={bookingData.checkIn}
                  required="required"
                  onChange={(e) =>
                    setBookingData({ ...bookingData, checkIn: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Check-Out Date</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  value={bookingData.checkOut}
                  required="required"
                  onChange={(e) =>
                    setBookingData({ ...bookingData, checkOut: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">No. OF Guest</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  min="1"
                  value={bookingData.guests}
                  required="required"
                  onChange={(e) =>
                    setBookingData({ ...bookingData, guests: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  placeholder="Your Address"
                  className="form-control mb-2"
                  value={bookingData.address}
                  required="required"
                  onChange={(e) =>
                    setBookingData({ ...bookingData, address: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-success" type="submit">
                  {isLoding && <LodingFroBtn />}Confirm Booking
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
