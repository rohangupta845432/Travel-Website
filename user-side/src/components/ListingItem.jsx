import React from "react";
import "./listing-item.css";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
const ListingItem = ({ listingItem: item }) => {
  return (
    <Link className="listing-link" to={`/listing-details/${item.dbId}`}>
      <div className="listing-item d-flex">
        <img src={item.image1} alt={item.name} className="listing-img" />
        <div className="listing-card">
          <div className="listing-card-body">
            <div className="listing-title">
              <h3>{item.name}</h3>
              <p className="listing-address">
                <i>{item.address}</i>
              </p>
              <p className="listing-category">Category: {item.category}</p>
              <p className="listing-features">{item.features}</p>
            </div>
            <div className="listing-price">
              <h3>
                <FaRupeeSign />
                {item.price}
              </h3>
              <p className="listing-tax">All taxes included</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingItem;
