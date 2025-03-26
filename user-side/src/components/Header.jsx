import React, { useCallback, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/useHttp";
import { categoryActions } from "../store/slices/category-slices";
import { BASE_URL } from "../urls";
import { listingActions } from "../store/slices/listing-slice";
import logo from "../../public/logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authAction } from "../store/slices/auth-slice";
import { bookingActions } from "../store/slices/booking-slice";

const Header = () => {
  const { isPending, httpError, fetchData } = useHttp();
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleFetchData = useCallback(
    async (data) => {
      console.log(data.length);
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
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(`${BASE_URL}listing.json`, {}, handleFetchData);
  }, [fetchData, handleFetchData]);

  const handleFetchCatData = useCallback(
    async (data) => {
      console.log(data.length);
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
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(`${BASE_URL}category.json`, {}, handleFetchCatData);
  }, [fetchData, handleFetchCatData]);

  const handleFetchBookingData = useCallback(
    async (data) => {
      // console.log(data.lenght);
      if (data) {
        const datalist = [];
        const keys = Object.keys(data);
        keys.forEach((key) => {
          datalist.push({ ...data[key], dbId: key });
        });
        console.log(datalist);
        dispatch(bookingActions.setBookings(datalist));
      } else {
        dispatch(bookingActions.setBookings([]));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(`${BASE_URL}booking.json`, {}, handleFetchBookingData);
  }, [fetchData, handleFetchBookingData]);

  const onLogOutHandler = () => {
    dispatch(authAction.logout());
  };
  return (
    <Navbar bg="light shadow-sm border-bottom" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          MyTravelSite
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/listing">
              Properties
            </Link>
            {authData.isUserLogin ? (
              <>
                <Link className="nav-link" to="/bookings">
                  <FaShoppingCart />
                </Link>
                <Link className="nav-link" to="/profile">
                  <FaUser />
                </Link>
                <Link className="btn btn-danger" onClick={onLogOutHandler}>
                  <IoIosLogOut /> LogOut
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/login">
                LogIn
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
