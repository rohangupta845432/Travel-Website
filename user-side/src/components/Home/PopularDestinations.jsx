import React from "react";
import { useSelector } from "react-redux";
import ListingItem from "../ListingItem";

const PopularDestinations = () => {
  const { items: listings } = useSelector((state) => state.listing);
  return (
    <div>
      <h3>Popular Destinations</h3>
      <div className="row">
        {listings.slice(0.5).map((listing) => (
          <div className="col-md-8" key={listing.dbId}>
            <ListingItem listingItem={listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
