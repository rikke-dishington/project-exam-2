import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  ImageSection,
  ImageWrapper,
  VenueImage,
  ImageButton,
  ImageDots,
  ImageDot,
} from './styles';

function ImageCarousel({ images }) {
  const processedImages = images && images.length > 0
    ? images
    : [{ 
        url: 'https://placehold.co/600x400?text=No+Image+Available',
        alt: 'No image available'
      }];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? processedImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === processedImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <ImageSection>
      <ImageWrapper>
        <VenueImage 
          src={processedImages[currentImageIndex].url} 
          alt={processedImages[currentImageIndex].alt}
        />
        {processedImages.length > 1 && (
          <>
            <ImageButton direction="left" onClick={handlePrevious}>
              <FaChevronLeft />
            </ImageButton>
            <ImageButton direction="right" onClick={handleNext}>
              <FaChevronRight />
            </ImageButton>
            <ImageDots>
              {processedImages.map((_, index) => (
                <ImageDot
                  key={index}
                  active={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </ImageDots>
          </>
        )}
      </ImageWrapper>
    </ImageSection>
  );
}

export default ImageCarousel; 