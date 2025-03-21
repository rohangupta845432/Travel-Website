import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ViewListing = () => {
  const { id } = useParams();
  const listing = useSelector((state) =>
    state.listing.items.find((item) => item.id.toString() === id)
  );

  if (!listing) {
    return <h2 className="text-center mt-4">Listing not found</h2>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mt-4">
      <h2>{listing.name}</h2>
      <Slider {...settings}>
        {listing.image1 && (
          <div>
            <img src={listing.image1} alt="Listing 1" className="img-fluid" />
          </div>
        )}
        {listing.image2 && (
          <div>
            <img src={listing.image2} alt="Listing 2" className="img-fluid" />
          </div>
        )}
        {listing.image3 && (
          <div>
            <img src={listing.image3} alt="Listing 3" className="img-fluid" />
          </div>
        )}
      </Slider>
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
    </div>
  );
};

export default ViewListing;
