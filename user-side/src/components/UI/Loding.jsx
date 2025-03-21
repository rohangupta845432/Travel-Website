import React from "react";

function Loding() {
  return (
    <div
      className="text-center"
      style={{ width: "100%", height: "100%", margin: "40px" }}
    >
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Loding;
