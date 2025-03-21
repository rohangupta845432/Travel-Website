import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categoryActions } from "../../store/slices/category-slices";
import catData from "../../testdata/categoryData";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../urls";
const ManageCategory = () => {
  const dispatch = useDispatch();
  const { isPending, httpError, fetchData } = useHttp();
  const { items } = useSelector((state) => state.category);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [categoryName, setCategoryName] = useState("");
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
  };

  const handleUpdate = async (dbId) => {
    if (newName.trim() === "") return;
    // const updatedCategory = await updateCategory(id, newName);
    // if (updatedCategory) {
    console.log(dbId);
    const handleUpdateFetchData = (dbId) => {
      dispatch(categoryActions.editCategory({ dbId, name: newName }));
      setEditingId(null);
    };
    fetchData(
      `${BASE_URL}category/${dbId}.json`,
      {
        method: "PATCH",
        body: { name: newName },
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
          dbId: data.name,
        })
      );
      setCategoryName("");
    };
    fetchData(
      `${BASE_URL}category.json`,
      {
        method: "POST",
        body: { id: Date.now(), name: categoryName },
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
        />
        <button className="btn btn-primary mt-2" onClick={handleAdd}>
          Add Category
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Category Name</th>
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
                <td>
                  {editingId === category.id ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    category.name
                  )}
                </td>
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
