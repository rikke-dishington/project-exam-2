import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { 
  FaWifi, 
  FaParking, 
  FaCoffee, 
  FaPaw,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser
} from 'react-icons/fa';
import {
  Card,
  ImageContainer,
  ImageSlider,
  Image,
  Info,
  TitleRow,
  Stats,
  Location,
  Price,
  ButtonGroup,
  DeleteButton
} from './VenueManagerCard.styles';

function VenueManagerCard({ venue, onEdit, onDelete }) {
  const { name, description, media, price, maxGuests, location, meta } = venue;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false
  };

  return (
    <Card>
      <ImageContainer>
        {media && media.length > 1 ? (
          <ImageSlider>
            <Slider {...settings}>
              {media.map((imageUrl, index) => (
                <div key={index}>
                  <Image 
                    src={imageUrl || '/placeholder-image.jpg'} 
                    alt={`${name} - image ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </ImageSlider>
        ) : (
          <Image 
            src={media?.[0] || '/placeholder-image.jpg'} 
            alt={name}
          />
        )}
      </ImageContainer>

      <Info>
        <TitleRow>
          <h3>{name}</h3>
        </TitleRow>

        <Stats>
          <span>
            <FaUser />
            {maxGuests} guests
          </span>
          {meta?.wifi && (
            <span>
              <FaWifi className="fa-wifi" />
              WiFi
            </span>
          )}
          {meta?.parking && (
            <span>
              <FaParking className="fa-parking" />
              Parking
            </span>
          )}
          {meta?.breakfast && (
            <span>
              <FaCoffee className="fa-coffee" />
              Breakfast
            </span>
          )}
          {meta?.pets && (
            <span>
              <FaPaw className="fa-paw" />
              Pets allowed
            </span>
          )}
        </Stats>

        <Location>
          <FaMapMarkerAlt />
          {location?.city}, {location?.country}
        </Location>

        <Price>
          <FaDollarSign />
          {price} <span>per night</span>
        </Price>

        <ButtonGroup>
          <button onClick={() => onEdit(venue)}>
            <FiEdit2 /> Edit
          </button>
          <DeleteButton onClick={() => onDelete(venue.id)}>
            <FiTrash2 /> Delete
          </DeleteButton>
        </ButtonGroup>
      </Info>
    </Card>
  );
}

export default VenueManagerCard; 