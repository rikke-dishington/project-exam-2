import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;

  .slick-slider {
    height: 100%;
  }

  .slick-list, .slick-track {
    height: 100%;
  }

  .slick-slide > div {
    height: 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  svg {
    font-size: 1.2rem;
    color: #333;
  }
`;

const PrevArrow = (props) => (
  <ArrowButton className="prev" onClick={props.onClick}>
    <FaChevronLeft />
  </ArrowButton>
);

const NextArrow = (props) => (
  <ArrowButton className="next" onClick={props.onClick}>
    <FaChevronRight />
  </ArrowButton>
);

const ImageCarousel = ({ images }) => {
  // Only show navigation if there are multiple images
  const hasMultipleImages = images.length > 1;

  const settings = {
    dots: hasMultipleImages,
    infinite: hasMultipleImages,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: hasMultipleImages ? <PrevArrow /> : null,
    nextArrow: hasMultipleImages ? <NextArrow /> : null,
    adaptiveHeight: true,
    // Disable dragging/swiping if there's only one image
    swipe: hasMultipleImages,
    draggable: hasMultipleImages
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <img src={image} alt={`Venue view ${index + 1}`} />
          </ImageWrapper>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ImageCarousel; 