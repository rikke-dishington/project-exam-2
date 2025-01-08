import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegHeart } from 'react-icons/fa';
import { 
  Card, 
  ImageSlider,
  ImageContainer, 
  Image, 
  Info, 
  TitleRow,
  Location, 
  Rating,
  Price,
  HeartButton 
} from './VenueCard.styles';

function VenueCard({ venue }) {
  const navigate = useNavigate();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false
  };

  const handleCardClick = () => {
    navigate(`/venue/${venue.id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <ImageContainer>
        <HeartButton onClick={(e) => e.stopPropagation()}>
          <FaRegHeart />
        </HeartButton>
        {venue.media.length > 1 ? (
          <ImageSlider>
            <Slider {...settings}>
              {venue.media.map((imageUrl, index) => (
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
            src={venue.media[0] || '/placeholder-image.jpg'} 
            alt={venue.name}
          />
        )}
      </ImageContainer>
      <Info>
        <TitleRow>
          <h3>{venue.name}</h3>
          <Rating><span>★</span> {venue.rating.toFixed(1)}</Rating>
        </TitleRow>
        <Location>{venue.location.city}, {venue.location.country}</Location>
        <Price><span>${venue.price}</span> per night</Price>
      </Info>
    </Card>
  );
}

export default VenueCard;