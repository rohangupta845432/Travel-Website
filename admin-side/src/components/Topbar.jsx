import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const Topbar = ({ toggleSidebar, collapsed }) => {
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
