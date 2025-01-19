import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { 
  Card, 
  ImageSlider,
  ImageContainer, 
  Image, 
  Info, 
  TitleRow,
  Location, 
  Price,
  VenueActions,
  ActionButton,
  Stats
} from './VenueManagerCard.styles';

function VenueManagerCard({ venue, onEdit, onDelete }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false
  };

  // Safely access nested properties
  const bookingsCount = venue.bookings?.length || 0;
  const rating = venue.rating || 0;
  const mediaUrls = venue.media || [];
  const price = venue.price || 0;
  const maxGuests = venue.maxGuests || 1;
  const city = venue.location?.city || 'Unknown City';
  const country = venue.location?.country || 'Unknown Country';

  return (
    <Card>
      <ImageContainer>
        {mediaUrls.length > 1 ? (
          <ImageSlider>
            <Slider {...settings}>
              {mediaUrls.map((imageUrl, index) => (
                <div key={index}>
                  <Image 
                    src={imageUrl || '/placeholder-image.jpg'} 
                    alt={`${venue.name} - image ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </ImageSlider>
        ) : (
          <Image 
            src={mediaUrls[0] || '/placeholder-image.jpg'} 
            alt={venue.name}
          />
        )}
      </ImageContainer>
      <Info>
        <TitleRow>
          <h3>{venue.name}</h3>
          <Stats>
            <div>
              <span>Bookings</span>
              <strong>{bookingsCount}</strong>
            </div>
            <div>
              <span>Rating</span>
              <strong>{rating > 0 ? rating.toFixed(1) : 'N/A'}</strong>
            </div>
          </Stats>
        </TitleRow>
        <Location>{city}, {country}</Location>
        <Price><span>${price}</span> per night</Price>
        <div className="guests">Max guests: {maxGuests}</div>
        <VenueActions>
          <ActionButton onClick={(e) => {
            e.preventDefault();
            onEdit(venue);
          }}>
            <FiEdit2 /> Edit
          </ActionButton>
          <ActionButton 
            className="delete" 
            onClick={(e) => {
              e.preventDefault();
              onDelete(venue);
            }}
          >
            <FiTrash2 /> Delete
          </ActionButton>
        </VenueActions>
      </Info>
    </Card>
  );
}

export default VenueManagerCard; 