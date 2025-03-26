import React from "react";
import { Link } from "react-router-dom";

const FavouriteStayItem = ({ image, text }) => {
  return (
    <Link to={text === "All" ? "/listing" : `/listing/${text}`}>
      <div className="favourite-stay-item">
        <img className="favourite-stay-item-img" src={image} />
        <h5 className="favourite-stay-item-text">{text}</h5>
      </div>
    </Link>
  );
};

export default FavouriteStayItem;
