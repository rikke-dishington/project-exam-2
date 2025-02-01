import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import {
  Header,
  Title,
  SubHeader,
  Location,
  Rating,
} from './styles';

function VenueHeader({ name, location, rating }) {
  return (
    <Header>
      <Title>{name}</Title>
      <SubHeader>
        <Location>
          <FaMapMarkerAlt />
          {location?.city}, {location?.country}
        </Location>
        {rating > 0 && (
          <Rating>
            <FaStar /> {rating.toFixed(1)}
          </Rating>
        )}
      </SubHeader>
    </Header>
  );
}

export default VenueHeader; 