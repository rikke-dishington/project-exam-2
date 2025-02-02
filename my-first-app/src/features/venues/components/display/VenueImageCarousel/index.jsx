import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  ImageSection,
  ImageWrapper,
  VenueImage,
  ImageButton,
  ImageDots,
  ImageDot,
} from './styles';

/**
 * VenueImageCarousel Component
 * 
 * A responsive image carousel component for displaying venue images with navigation
 * controls and indicators. Handles both single and multiple image scenarios with
 * appropriate fallbacks.
 * 
 * Features:
 * - Responsive image display
 * - Previous/Next navigation buttons
 * - Image indicator dots
 * - Circular navigation
 * - Fallback for no images
 * - Accessible controls
 * - Touch-friendly interface
 * - Automatic image sizing
 * 
 * @component
 * @example
 * ```jsx
 * <VenueImageCarousel
 *   images={[
 *     { url: 'image1.jpg', alt: 'Living room' },
 *     { url: 'image2.jpg', alt: 'Kitchen' },
 *     { url: 'image3.jpg', alt: 'Bedroom' }
 *   ]}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.images] - Array of image objects
 * @param {string} props.images[].url - URL of the image
 * @param {string} props.images[].alt - Alt text for the image
 */
function VenueImageCarousel({ images }) {
  const processedImages = images && images.length > 0
    ? images
    : [{ 
        url: 'https://placehold.co/600x400?text=No+Image+Available',
        alt: 'No image available'
      }];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Handles navigation to the previous image
   * Wraps around to the last image if at the beginning
   */
  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? processedImages.length - 1 : prev - 1
    );
  };

  /**
   * Handles navigation to the next image
   * Wraps around to the first image if at the end
   */
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
            <ImageButton 
              direction="left" 
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <FaChevronLeft aria-hidden="true" />
            </ImageButton>
            <ImageButton 
              direction="right" 
              onClick={handleNext}
              aria-label="Next image"
            >
              <FaChevronRight aria-hidden="true" />
            </ImageButton>
            <ImageDots>
              {processedImages.map((_, index) => (
                <ImageDot
                  key={index}
                  active={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  role="button"
                />
              ))}
            </ImageDots>
          </>
        )}
      </ImageWrapper>
    </ImageSection>
  );
}

VenueImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }))
};

export default VenueImageCarousel; 