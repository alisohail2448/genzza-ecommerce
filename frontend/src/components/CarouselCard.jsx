import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import slide from "../images/slide.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";

function CarouselCard() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} indicators={false} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src={slide3} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCard;
