import React from "react";

const AddListingForm = ({
  listingData,
  setListingData,
  editingId,
  handleOnAdd,
  handleOnUpdate,
  categories,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <div className="row">
            <div className="col-md-8">
              <input
                type="text"
                placeholder="Name"
                value={listingData.name}
                onChange={(e) =>
                  setListingData({ ...listingData, name: e.target.value })
                }
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Price"
                value={listingData.price}
                onChange={(e) =>
                  setListingData({ ...listingData, price: e.target.value })
                }
                className="form-control mb-2"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <input
                type="text"
                placeholder="Address"
                value={listingData.address}
                onChange={(e) =>
                  setListingData({ ...listingData, address: e.target.value })
                }
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-4">
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
            </div>
          </div>
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
          <input
            type="text"
            placeholder="Add Features separated with comma"
            value={listingData.features}
            onChange={(e) =>
              setListingData({ ...listingData, features: e.target.value })
            }
            className="form-control mb-2"
          />
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
              onClick={() => {
                handleOnUpdate(editingId);
              }}
            >
              Update Listing
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleOnAdd}>
              Add Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddListingForm;
