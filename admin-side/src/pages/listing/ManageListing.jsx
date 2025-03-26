import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listingActions } from "../../store/slices/listing-slice";
import { categoryActions } from "../../store/slices/category-slices";
import { Link } from "react-router-dom";
import listingDummyData from "../../testdata/listingData";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../urls";
import AddListingForm from "./AddListingForm";
import Modal from "../../components/UI/Modal";
import { FaPlus } from "react-icons/fa";
const ManageListings = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");
  const { isPending, httpError, fetchData } = useHttp();
  const { items: listings } = useSelector((state) => state.listing);
  const { items: categories } = useSelector((state) => state.category);
  const [editingId, setEditingId] = useState(null);
  const [listingData, setListingData] = useState({
    name: "",
    price: "",
    address: "",
    category: "",
    image1: "",
    image2: "",
    image3: "",
    description: "",
    features: "",
    availability: "available",
  });

  const handleFetchData = useCallback((data) => {
    console.log(data.lenght);
    if (data) {
      const datalist = [];
      const keys = Object.keys(data);
      keys.forEach((key) => {
        datalist.push({ ...data[key], dbId: key });
      });
      console.log(datalist);
      dispatch(listingActions.setListings(datalist));
    } else {
      dispatch(categoryActions.setCategory([]));
    }
  }, []);

  useEffect(() => {
    fetchData(`${BASE_URL}listing.json`, {}, handleFetchData);
  }, [fetchData, handleFetchData, dispatch]);

  useEffect(() => {}, [dispatch]);

  const handleDelete = async (dbId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const handleDeleteFetchData = (data) => {
        dispatch(listingActions.removeListing(dbId));
      };
      fetchData(
        `${BASE_URL}listing/${dbId}.json`,
        {
          method: "Delete",
          body: null,
          headers: {
            "Content-Type": "application/json",
          },
        },
        handleDeleteFetchData
      );
    }
  };

  const handleEdit = (listing) => {
    setEditingId(listing.dbId);
    setListingData({
      name: listing.name,
      price: listing.price,
      address: listing.address,
      category: listing.category,
      image1: listing.image1 ? listing.image1 : "",
      image2: listing.image2 ? listing.image2 : "",
      image3: listing.image3 ? listing.image3 : "",
      features: listing.features ? listing.features : "",
      description: listing.description,
      availability: listing.availability,
    });
    setIsOpen(true);
  };

  const handleUpdate = (dbId) => {
    console.log("Handle Update Call", dbId);
    const handleUpdateFetchData = (data) => {
      dispatch(listingActions.editListing({ ...listingData, dbId }));
      setEditingId(null);
      setListingData({
        name: "",
        price: "",
        address: "",
        category: "",
        image1: "",
        image2: "",
        image3: "",
        description: "",
        features: "",
        availability: "available",
      });
      setIsOpen(false);
    };
    fetchData(
      `${BASE_URL}listing/${dbId}.json`,
      {
        method: "PATCH",
        body: { ...listingData },
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleUpdateFetchData
    );
  };

  const handleAdd = async () => {
    if (
      !listingData.name ||
      !listingData.price ||
      !listingData.address ||
      !listingData.category ||
      !listingData.image1 ||
      !listingData.description ||
      !listingData.features
    )
      return;

    const handleAddFetchData = (data) => {
      dispatch(
        listingActions.addNewListing({
          ...listingData,
          id: Date.now(),
          dbId: data.name,
        })
      );
      setListingData({
        name: "",
        price: "",
        address: "",
        category: "",
        image1: "",
        image2: "",
        image3: "",
        description: "",
        features: "",
        availability: "available",
      });
      onClose();
    };
    fetchData(
      `${BASE_URL}listing.json`,
      {
        method: "POST",
        body: { ...listingData, id: Date.now() },
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleAddFetchData
    );
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const handleOpenForAdd = () => {
    setEditingId(null);
    setListingData({
      name: "",
      price: "",
      address: "",
      category: "",
      image1: "",
      image2: "",
      image3: "",
      description: "",
      features: "",
      availability: "available",
    });
    setIsOpen(true);
  };
  return (
    <div className="container mt-4">
      <h2>Manage Listings</h2>
      <Modal isOpen={isOpen} onClose={onClose}>
        <AddListingForm
          setListingData={setListingData}
          listingData={listingData}
          editingId={editingId}
          handleOnAdd={handleAdd}
          handleOnUpdate={handleUpdate}
          categories={categories}
        />
      </Modal>
      <button className="btn btn-primary" onClick={() => handleOpenForAdd()}>
        <FaPlus /> Add New Listing
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>
                <Link to={`/listing-details/${listing.dbId}`}>
                  {listing.name}
                </Link>
              </td>
              <td>{listing.price}</td>
              <td>{listing.address}</td>
              <td>{listing.category}</td>
              <td>
                <Link
                  className="btn btn-success btn-sm mr-2"
                  to={`/listing-details/${listing.dbId}`}
                >
                  View
                </Link>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(listing)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(listing.dbId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageListings;
