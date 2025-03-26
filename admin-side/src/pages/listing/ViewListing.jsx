import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { useState } from "react";

const ViewListing = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const listing = useSelector((state) =>
    state.listing.items.find((item) => item.dbId.toString() === id)
  );

  if (!listing) {
    return <h2 className="text-center mt-4">Listing not found</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>{listing.name}</h2>

      <Carousel activeIndex={index} onSelect={handleSelect}>
        {["image1", "image2", "image3"].map((imgKey, idx) => (
          <Carousel.Item key={idx}>
            <img
              src={listing[imgKey]}
              alt={`Listing ${idx + 1}`}
              className="img-fluid"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <p>
        <strong>Price:</strong> ${listing.price}
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
    </div>
  );
};

export default ViewListing;
