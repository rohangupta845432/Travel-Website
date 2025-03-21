import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  //   console.log(window.innerWidth);
  const [collapsed, setCollapsed] = useState(
    window.innerWidth < 878 ? true : false
  );
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      <div className="content-area flex-grow-1">
        {/* Topbar */}
        <Topbar
          toggleSidebar={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />

        {/* Main Content */}
        <div className="container mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
