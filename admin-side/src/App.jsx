import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "./pages/Dashbord";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import { useSelector } from "react-redux";
import Managecategory from "./pages/category/ManageCategory";
import ManageListings from "./pages/listing/ManageListing";
import ManageBooking from "./pages/booking/ManageBooking";
import Dashbord from "./pages/Dashbord";
import { useDispatch } from "react-redux";
import useHttp from "./hooks/useHttp";
import { BASE_URL } from "./urls";
import ViewListing from "./pages/listing/ViewListing";

const App = () => {
  const dispatch = useDispatch();
  const { isPending, httpError, fetchData } = useHttp();
  const getCategoryData = () => {
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
  };
  getCategoryData();

  const auth = useSelector((store) => store.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={auth.isAdminLogin ? <Navigate to={"/"} /> : <Login />}
        />
        {
          <Route
            path="/signup"
            element={auth.isAdminLogin ? <Navigate to={"/"} /> : <SignUp />}
          />
        }
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Layout>
                <Dashbord />
              </Layout>
            </ProtectRoute>
          }
        />

        <Route
          path="/category"
          element={
            <ProtectRoute>
              <Layout>
                <Managecategory />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/listing"
          element={
            <ProtectRoute>
              <Layout>
                <ManageListings />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/listing-details/:id"
          element={
            <ProtectRoute>
              <Layout>
                <ViewListing />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectRoute>
              <Layout>
                <ManageBooking />
              </Layout>
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
