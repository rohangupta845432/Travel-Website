import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../store/slices/category-slices";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../urls";
const ManageCategory = () => {
  const dispatch = useDispatch();
  const { isPending, httpError, fetchData } = useHttp();
  const { items } = useSelector((state) => state.category);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImageaUrl, setCategoryImageaUrl] = useState("");
  // console.log(categoryActions);

  const handleFetchData = useCallback((data) => {
    console.log(data.lenght);
    if (data) {
      const datalist = [];
      const keys = Object.keys(data);
      keys.forEach((key) => {
        datalist.push({ ...data[key], dbId: key });
      });
      console.log(datalist);
      dispatch(categoryActions.setCategory(datalist));
    } else {
      dispatch(categoryActions.setCategory([]));
    }
  }, []);

  useEffect(() => {
    fetchData(`${BASE_URL}category.json`, {}, handleFetchData);
  }, [fetchData, handleFetchData, dispatch]);

  // dispatch(categoryActions.setCategory(catData));

  const handleDelete = async (dbId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const handleDeleteFetchData = (data) => {
        dispatch(categoryActions.removeCategory(dbId));
      };
      fetchData(
        `${BASE_URL}category/${dbId}.json`,
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

  const handleEdit = (category) => {
    setEditingId(category.id);
    setNewName(category.name);
    setNewImageUrl(category.imageUrl);
  };

  const handleUpdate = async (dbId) => {
    if (newName.trim() === "" && newImageUrl.trim() === "") return;
    console.log(dbId);
    const handleUpdateFetchData = (data) => {
      dispatch(
        categoryActions.editCategory({
          dbId,
          name: newName,
          imageUrl: newImageUrl,
        })
      );
      setEditingId(null);
    };
    fetchData(
      `${BASE_URL}category/${dbId}.json`,
      {
        method: "PATCH",
        body: { name: newName, imageUrl: newImageUrl },
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleUpdateFetchData
    );
    // }
  };

  const handleAdd = async () => {
    if (categoryName.trim() === "") return;
    const handleAddFetchData = (data) => {
      dispatch(
        categoryActions.addCategory({
          id: Date.now(),
          name: categoryName,
          imageUrl: categoryImageaUrl,
          dbId: data.name,
        })
      );
      setCategoryName("");
      setCategoryImageaUrl("");
    };
    fetchData(
      `${BASE_URL}category.json`,
      {
        method: "POST",
        body: {
          id: Date.now(),
          name: categoryName,
          imageUrl: categoryImageaUrl,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleAddFetchData
    );
  };

  return (
    <div className="container mt-4">
      <h2>Manage Categories</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="form-control"
        />{" "}
        <input
          type="text"
          placeholder="Enter category Image Url"
          value={categoryImageaUrl}
          onChange={(e) => setCategoryImageaUrl(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2" onClick={handleAdd}>
          Add Category
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Category Name</th>
            <th>Category Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!items ? (
            <tr>
              <td colSpan="2" className="text-center">
                No categories available
              </td>
            </tr>
          ) : (
            items.map((category) => (
              <tr key={category.id}>
                {editingId === category.id ? (
                  <td>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="form-control"
                      required
                    />
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="form-control"
                      required
                    />
                  </td>
                ) : (
                  <>
                    <td>{category.name}</td>
                    <td>
                      <img src={category.imageUrl} alt="no image" height="50" />
                    </td>
                  </>
                )}

                <td>
                  {editingId === category.id ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdate(category.dbId)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(category.dbId)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;
