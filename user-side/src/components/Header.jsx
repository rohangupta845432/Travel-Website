import React, { useCallback, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useHttp from "../hooks/useHttp";
import { categoryActions } from "../store/slices/category-slices";
import { BASE_URL } from "../urls";
import { listingActions } from "../store/slices/listing-slice";

const Header = () => {
  const { isPending, httpError, fetchData } = useHttp();
  const dispatch = useDispatch();
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
      dispatch(listingActions.setListings([]));
    }
  }, []);

  useEffect(() => {
    fetchData(`${BASE_URL}listing.json`, {}, handleFetchData);
  }, [fetchData, handleFetchData, dispatch]);

  const handleFetchCatData = useCallback((data) => {
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
    fetchData(`${BASE_URL}category.json`, {}, handleFetchCatData);
  }, [fetchData, handleFetchCatData, dispatch]);

  return (
    <header className="p-3 bg-info text-white d-flex justify-content-between align-items-center">
      <div className="logo">MyTravelSite</div>
      <input
        type="text"
        placeholder="Search listings..."
        className="form-control w-25"
      />
      <div>
        <FaShoppingCart className="mx-3" size={20} />
        <FaUser size={20} />
      </div>
    </header>
  );
};

export default Header;
