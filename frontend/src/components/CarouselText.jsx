import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselText() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      indicators={false}
      prevIcon={<span className="carousel-control-prev-icon" />}
      nextIcon={<span className="carousel-control-next-icon" />}
    >
      <Carousel.Item>
        <p className="text-center mb-0" style={{color: "#e3e3e3f0"}}>"Welcome to GENZZA, where style meets convenience in the modern era of online shopping."</p>
      </Carousel.Item>
      <Carousel.Item>
        <p className="text-center mb-0" style={{color: "#e3e3e3f0"}}>"Discover a new era of shopping with GENZZA - Where Style Meets Convenience."</p>
      </Carousel.Item>
      <Carousel.Item>
        <p className="text-center mb-0" style={{color: "#e3e3e3f0"}}>"Experience the future of online shopping with GENZZA - Your Ultimate Retail Destination."</p>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselText;
