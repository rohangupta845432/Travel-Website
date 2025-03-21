const ListCard = ({ listing }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={listing.image} className="card-img-top" alt={listing.name} />
      <div className="card-body">
        <h5 className="card-title">{listing.name}</h5>
        <p className="card-text">{listing.address}</p>
        <p className="card-text">Price: ${listing.price} per night</p>
        <a className="btn btn-primary" to={`/listing-details/${listing.id}`}>
          View Details
        </a>
      </div>
    </div>
  );
};

export default ListCard;
