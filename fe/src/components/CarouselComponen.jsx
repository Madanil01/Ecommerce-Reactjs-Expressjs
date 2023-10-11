import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  const image1 = "/images/slider1.jpg"; // Path relatif ke gambar pertama
  const image2 = "/images/slider2.jpg";
  const image3 = "/images/slider3.jpg";

  return (
    <Carousel>
      <Carousel.Item interval={3500}>
        <img
          className="d-block w-100 h-[770px]"
          src={image1}
          alt="Image_One"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3500}>
        <img
          className="d-block w-100 h-[770px]"
          src={image2}
          alt="Image_Two"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3500}>
        <img
          className="d-block w-100 h-[770px]"
          src={image3}
          alt="Image_Three"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
