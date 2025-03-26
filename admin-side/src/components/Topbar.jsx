import React, { useCallback, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import useHttp from "../hooks/useHttp";
import { BASE_URL } from "../urls";
import { categoryActions } from "../store/slices/category-slices";
const Topbar = ({ toggleSidebar, collapsed }) => {
  const dispatch = useDispatch();
  const { isPending, httpError, fetchData } = useHttp();

  const handleFetchCatData = useCallback((data) => {
    console.log(data.lenght);
    if (data) {
      const datalist = [];
      const keys = Object.keys(data);
      keys.forEach((key) => {
        datalist.push({ ...data[key], dbId: key });
      });
      console.log("fetch category data from topbar", datalist);
      dispatch(categoryActions.setCategory(datalist));
    } else {
      dispatch(categoryActions.setCategory([]));
    }
  }, []);

  useEffect(() => {
    fetchData(`${BASE_URL}category.json`, {}, handleFetchCatData);
  }, [fetchData, handleFetchCatData, dispatch]);

  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Button variant="outline-light" onClick={toggleSidebar}>
        {collapsed ? <FaBars /> : <ImCross />}
      </Button>
      <Navbar.Brand className="ms-3">Admin Panel</Navbar.Brand>
    </Navbar>
  );
};

export default Topbar;
