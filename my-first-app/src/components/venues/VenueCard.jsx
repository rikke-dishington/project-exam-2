import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import {
  Card,
  ImageContainer,
  Image,
  Content,
  Title,
  Location,
  Price,
  Rating,
} from './VenueCard.styles';

function VenueCard({ venue }) {
  const { id, name, media, price, rating, location } = venue;
  
  // Get the first image URL or use placeholder
  const imageUrl = media?.[0]?.url || '/placeholder-image.jpg';
  const imageAlt = media?.[0]?.alt || name;

  return (
    <Card>
      <Link to={`/venue/${id}`}>
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
            <FaMapMarkerAlt />
            {location?.city}, {location?.country}
          </Location>
          <div>
            <Price>${price} <span>/ night</span></Price>
            {rating > 0 && (
              <Rating>
                <FaStar /> {rating.toFixed(1)}
              </Rating>
            )}
          </div>
        </Content>
      </Link>
    </Card>
  );
}

export default VenueCard;