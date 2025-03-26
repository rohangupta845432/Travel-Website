import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const ImageSlider = ({ imageList }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {imageList.map((image) => {
        return (
          <Carousel.Item>
            <img height="500px" src={image} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
