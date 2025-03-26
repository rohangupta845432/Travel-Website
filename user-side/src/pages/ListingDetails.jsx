import React, { useState } from "react";
import { FaLongArrowAltLeft, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import Modal from "../components/UI/Modal";
import "./ListingDetail.css";
import ImageSlider from "../components/UI/ImageSlider";
const ListingDetail = () => {
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { id: urlId } = useParams();
  const listingList = useSelector((state) => state.listing.items);
  const listing = listingList.find((item) => item.dbId.toString() === urlId);

  const onClose = () => {
    setIsOpen(false);
  };
  const onImageModalClose = () => {
    setIsImageModalOpen(false);
  };

  const onBookNowHandle = () => {
    console.log(loginData);
    if (loginData.userEmail) {
      setIsOpen(true);
    } else {
      localStorage.setItem(
        "redirectAfterLogin",
        `/listing-details/${listing.dbId}`
      );
      navigate("/login");
    }
  };

  if (!listing) {
    return <h4>NO Listing Found</h4>;
  }
  return (
    <div className="container mt-4">
      <div>
        <Link to="/listing" className="pb-4">
          <FaLongArrowAltLeft /> See all properties
        </Link>
      </div>

      <div className="mt-4 card p-5">
        <h2>{listing.name}</h2>
        <div
          className="listing-images"
          onClick={() => setIsImageModalOpen(true)}
        >
          <div className="main-image">
            <img
              src={listing.image1}
              alt={listing.name}
              className="img-fluid img-thumbnail"
            />
          </div>
          <div className="image-slider">
            <img
              src={listing.image1}
              alt={listing.name}
              className="img-fluid"
            />
            <img
              src={listing.image2}
              alt={listing.name}
              className="img-fluid"
            />
            <img
              src={listing.image3}
              alt={listing.name}
              className="img-fluid"
            />
          </div>
        </div>
        <p>
          <strong>Price:</strong> {listing.price}
        </p>
        <p>
          <strong>Address:</strong> {listing.address}
        </p>
        <p>
          <strong>Category:</strong> {listing.category}
        </p>
        <p>
          <strong>Description:</strong> {listing.description}
        </p>
        <p>
          <strong>Availability:</strong> {listing.availability}
        </p>
        {listing.availability === "available" ? (
          <button className="btn btn-primary" onClick={onBookNowHandle}>
            Book Now
          </button>
        ) : (
          <button className="btn btn-danger">Not Available</button>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <BookingModal listing={listing} />
        </Modal>
        <Modal isOpen={isImageModalOpen} onClose={onImageModalClose}>
          <ImageSlider
            imageList={[listing.image1, listing.image2, listing.image3]}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ListingDetail;
