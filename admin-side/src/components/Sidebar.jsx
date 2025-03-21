import React from "react";

import "./Sidebar.css";

import { IoMdSend } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { RiInboxLine } from "react-icons/ri";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/slices/auth-slice";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({ collapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authAction.logout());
    navigate("/login");
    console.log("logout");
  };
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h4 className="text-white text-center mt-3"></h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <RiInboxLine /> <span className="ms-2">Dashbord</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <RiInboxLine /> <span className="ms-2">Category</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/listing"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <RiInboxLine /> <span className="ms-2">Listing</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/booking"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <IoMdSend />
            <span className="ms-2">Booking</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <a className="nav-link text-white" onClick={logoutHandler}>
            <LuLogOut /> <span className="ms-2">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
