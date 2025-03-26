import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ScrollableSlider.css"; // Custom styling for slider

const ScrollableSlider = ({ children }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="slider-container d-flex align-items-center">
      <button className="btn btn-light btn-left border" onClick={scrollLeft}>
        &lt;
      </button>

      <div className="slider" ref={sliderRef}>
        {/* <div className="slider-item"> 
          </div> */}
        {children}
      </div>

      <button className="btn btn-light btn-right border" onClick={scrollRight}>
        &gt;
      </button>
    </div>
  );
};

export default ScrollableSlider;
