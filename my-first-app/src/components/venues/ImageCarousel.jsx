import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CarouselContainer,
  ImageWrapper,
  ArrowButton
} from './ImageCarousel.styles';

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
  const hasMultipleImages = images.length > 1;

  const settings = {
    dots: hasMultipleImages,
    infinite: hasMultipleImages,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: hasMultipleImages ? <PrevArrow /> : null,
    nextArrow: hasMultipleImages ? <NextArrow /> : null,
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