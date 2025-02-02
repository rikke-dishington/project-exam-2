import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  Header,
  Title,
  SubHeader,
  Location,
  Rating,
} from './styles';

/**
 * VenueHeader Component
 * 
 * A header component for displaying venue title information including
 * the venue name, location, and rating. Provides a consistent header
 * layout for venue details.
 * 
 * Features:
 * - Prominent venue name display
 * - Location information with icon
 * - Optional rating display with star
 * - Clean typography
 * - Responsive layout
 * - Accessible text structure
 * - Consistent branding
 * - Semantic HTML structure
 * 
 * @component
 * @example
 * ```jsx
 * <VenueHeader
 *   name="Luxury Beach Villa"
 *   location={{
 *     city: "Malibu",
 *     country: "USA"
 *   }}
 *   rating={4.8}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the venue
 * @param {Object} props.location - Location information
 * @param {string} props.location.city - City where venue is located
 * @param {string} props.location.country - Country where venue is located
 * @param {number} [props.rating] - Optional rating score (0-5)
 */
function VenueHeader({ name, location, rating }) {
  return (
    <Header>
      <Title>{name}</Title>
      <SubHeader>
        <Location>
          <FaMapMarkerAlt aria-hidden="true" />
          <span>{location?.city}, {location?.country}</span>
        </Location>
        {rating > 0 && (
          <Rating>
            <FaStar aria-hidden="true" />
            <span aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
              {rating.toFixed(1)}
            </span>
          </Rating>
        )}
      </SubHeader>
    </Header>
  );
}

VenueHeader.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  rating: PropTypes.number
};

export default VenueHeader; 