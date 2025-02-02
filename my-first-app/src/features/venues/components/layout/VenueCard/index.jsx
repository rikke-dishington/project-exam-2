import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  Card,
  ImageContainer,
  Image,
  Content,
  Title,
  Location,
  Price,
  Rating,
} from './styles';

/**
 * VenueCard Component
 * 
 * A card component that displays venue information in a visually appealing format.
 * Used in venue listings and search results to show key venue details with a consistent layout.
 * 
 * Features:
 * - Clickable card linking to venue details
 * - Primary venue image with fallback handling
 * - Venue name and location display
 * - Price per night
 * - Rating display (if available)
 * - Responsive design
 * - Error handling for images
 * - Accessible content structure
 * 
 * @component
 * @example
 * ```jsx
 * <VenueCard
 *   venue={{
 *     id: '123',
 *     name: 'Luxury Beach Villa',
 *     media: [{ url: 'villa.jpg', alt: 'Luxury Beach Villa' }],
 *     price: 299,
 *     rating: 4.8,
 *     location: {
 *       city: 'Malibu',
 *       country: 'USA'
 *     }
 *   }}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.venue - The venue object containing all venue details
 * @param {string} props.venue.id - Unique identifier for the venue
 * @param {string} props.venue.name - Name of the venue
 * @param {Array<Object>} [props.venue.media] - Array of media objects for the venue
 * @param {number} props.venue.price - Price per night
 * @param {number} [props.venue.rating] - Optional rating score (0-5)
 * @param {Object} props.venue.location - Location information
 * @param {string} props.venue.location.city - City where venue is located
 * @param {string} props.venue.location.country - Country where venue is located
 */
function VenueCard({ venue }) {
  const { id, name, media, price, rating, location } = venue;
  
  // Get the first image URL or use placeholder
  const imageUrl = media?.[0]?.url || '/placeholder-image.jpg';
  const imageAlt = media?.[0]?.alt || name;

  return (
    <Card>
      <Link to={`/venue/${id}`} aria-label={`View details for ${name}`}>
        <ImageContainer>
          <Image 
            src={imageUrl} 
            alt={imageAlt}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </ImageContainer>
        <Content>
          <Title>{name}</Title>
          <Location>
            <FaMapMarkerAlt aria-hidden="true" />
            {location?.city}, {location?.country}
          </Location>
          <div>
            <Price>${price} <span>/ night</span></Price>
            {rating > 0 && (
              <Rating>
                <FaStar aria-hidden="true" /> {rating.toFixed(1)}
              </Rating>
            )}
          </div>
        </Content>
      </Link>
    </Card>
  );
}

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    })),
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default VenueCard;