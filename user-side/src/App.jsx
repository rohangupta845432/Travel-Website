import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "./pages/Dashbord";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import { useSelector } from "react-redux";
import ManageBooking from "./pages/booking/ManageBooking";
import HomePage from "./pages/HomePage";
import ListingDetail from "./pages/ListingDetails";
import ListingPage from "./pages/ListingPage";

const App = () => {
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
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/listing/:cat"
          element={
            <Layout>
              <ListingPage />
            </Layout>
          }
        />

        <Route
          path="/listing"
          element={
            <Layout>
              <ListingPage />
            </Layout>
          }
        />

        <Route
          path="/listing-details/:id"
          element={
            <Layout>
              <ListingDetail />
            </Layout>
          }
        />

        <Route
          path="/bookings"
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
