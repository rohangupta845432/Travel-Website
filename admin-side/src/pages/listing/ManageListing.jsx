import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listingActions } from "../../store/slices/listing-slice";
import { categoryActions } from "../../store/slices/category-slices";
import listingDummyData from "../../testdata/listingData";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../urls";
const ManageListings = () => {
  const dispatch = useDispatch();

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
    availability: "available",
  });

  const catData = useSelector((state) => state.category.items);
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
      dispatch(categoryActions.setCategory(catData));
    } else {
      dispatch(categoryActions.setCategory([]));
      dispatch(categoryActions.setCategory(catData));
    }
  }, []);

  useEffect(() => {
    fetchData(`${BASE_URL}listing.json`, {}, handleFetchData);
  }, [fetchData, handleFetchData, dispatch]);

  useEffect(() => {}, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      //   const deletedId = await deleteListing(id);
      dispatch(listingActions.removeListing(deletedId));
    }
  };

  const handleEdit = (listing) => {
    setEditingId(listing.dbId);
    setListingData({
      name: listing.name,
      price: listing.price,
      address: listing.address,
      category: listing.category,
      image1: listing.image1,
      image2: listing.image2,
      image3: listing.image3,
      description: listing.description,
      availability: listing.availability,
    });
  };

  const handleUpdate = async (dbId) => {
    console.log(dbId);
    const handleUpdateFetchData = (data) => {
      dispatch(listingActions.editListing({ ...listingData, dbId }));
      setEditingId(null);
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
      !listingData.description
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
        availability: "available",
      });
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

  return (
    <div className="container mt-4">
      <h2>Manage Listings</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Name"
          value={listingData.name}
          onChange={(e) =>
            setListingData({ ...listingData, name: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={listingData.price}
          onChange={(e) =>
            setListingData({ ...listingData, price: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={listingData.address}
          onChange={(e) =>
            setListingData({ ...listingData, address: e.target.value })
          }
          className="form-control mb-2"
        />
        <select
          className="form-control mb-2"
          value={listingData.category}
          onChange={(e) =>
            setListingData({ ...listingData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Image URL 1"
          value={listingData.image1}
          onChange={(e) =>
            setListingData({ ...listingData, image1: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Image URL 2"
          value={listingData.image2}
          onChange={(e) =>
            setListingData({ ...listingData, image2: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Image URL 3"
          value={listingData.image3}
          onChange={(e) =>
            setListingData({ ...listingData, image3: e.target.value })
          }
          className="form-control mb-2"
        />
        <textarea
          placeholder="Description"
          value={listingData.description}
          onChange={(e) =>
            setListingData({ ...listingData, description: e.target.value })
          }
          className="form-control mb-2"
        ></textarea>
        <select
          className="form-control mb-2"
          value={listingData.availability}
          onChange={(e) =>
            setListingData({ ...listingData, availability: e.target.value })
          }
        >
          <option value="available">Available</option>
          <option value="not available">Not Available</option>
        </select>
        {editingId ? (
          <button
            className="btn btn-primary"
            onClick={(editingId) => {
              handleUpdate(editingId);
            }}
          >
            Update Listing
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Listing
          </button>
        )}
      </div>

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
              <td>{listing.name}</td>
              <td>{listing.price}</td>
              <td>{listing.address}</td>
              <td>{listing.category}</td>
              <td>
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
