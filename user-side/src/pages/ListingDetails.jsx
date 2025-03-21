import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import Modal from "../components/UI/Modal";
const ListingDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id: urlId } = useParams();
  const listingList = useSelector((state) => state.listing.items);
  const listing = listingList.find((item) => item.id.toString() === urlId);

  const onClose = () => {
    setIsOpen(false);
  };

  if (!listing) {
    return <h4>NO Listing Found</h4>;
  }
  return (
    <div className="container mt-4">
      <h2>{listing.name}</h2>
      <div className="image-slider">
        <img src={listing.image1} alt={listing.name} className="img-fluid" />
        <img src={listing.image2} alt={listing.name} className="img-fluid" />
        <img src={listing.image3} alt={listing.name} className="img-fluid" />
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
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Book Now
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <BookingModal listing={listing} />
      </Modal>
    </div>
  );
};

export default ListingDetail;
