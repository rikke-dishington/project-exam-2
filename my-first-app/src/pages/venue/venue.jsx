import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { 
  FaWifi, 
  FaParking, 
  FaCoffee, 
  FaPaw,
  FaRegHeart,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
  FaStar
} from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getVenueById } from '../../utils/api/venues';
import {
  VenueContainer,
  VenueHeader,
  VenueTitle,
  VenueLocation,
  ImageGallery,
  VenueImage,
  VenueInfo,
  VenueDescription,
  VenueDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  BookingSection,
  BookingSectionHeader,
  PriceRow,
  BookingForm,
  DateInputGroup,
  GuestInputGroup,
  BookButton,
  BookingNote,
  VenueSubInfo,
  FacilitiesSection,
  FacilitiesList,
  FacilityItem,
  ImageContainer,
  HeartButton,
  LocationSection,
  LocationDetails,
  DescriptionSection
} from './venue.styles';
import { useTheme } from 'styled-components';

function Venue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme();

  const today = new Date().toISOString().split('T')[0];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    adaptiveHeight: true,
    fade: true,
    cssEase: 'linear'
  };

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueById(id);
        console.log('Venue data:', data);
        setVenue(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  const handleBooking = (e) => {
    e.preventDefault();
    console.log('Booking details:', { checkIn, checkOut, guests });
  };

  return (
    <VenueContainer>
      <ImageContainer>
        <HeartButton onClick={() => setIsFavorite(!isFavorite)}>
          <FaRegHeart />
        </HeartButton>
        <ImageGallery>
          {venue.media && venue.media.length > 0 ? (
            <Slider {...settings}>
              {venue.media.map((imageUrl, index) => (
                <div key={index}>
                  <VenueImage 
                    src={imageUrl || '/placeholder-image.jpg'} 
                    alt={`${venue.name} - image ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <VenueImage 
              src="/placeholder-image.jpg"
              alt={venue.name}
            />
          )}
        </ImageGallery>
      </ImageContainer>

      <VenueHeader>
        <VenueTitle>{venue.name}</VenueTitle>
        <VenueSubInfo>
          <span>{venue.maxGuests} guests</span>
          <span>•</span>
          <span><FaStar className="fa-star" /> {venue.rating.toFixed(1)}</span>
          {venue.meta.wifi && (
            <>
              <span>•</span>
              <span><FaWifi className="fa-wifi" /></span>
            </>
          )}
          {venue.meta.parking && (
            <>
              <span>•</span>
              <span><FaParking className="fa-parking" /></span>
            </>
          )}
          {venue.meta.breakfast && (
            <>
              <span>•</span>
              <span><FaCoffee className="fa-coffee" /></span>
            </>
          )}
          {venue.meta.pets && (
            <>
              <span>•</span>
              <span><FaPaw className="fa-paw" /></span>
            </>
          )}
        </VenueSubInfo>
      </VenueHeader>

      <VenueInfo>
        <VenueDescription>
          <DescriptionSection>
            <h2>About this venue</h2>
            <p>{venue.description}</p>
          </DescriptionSection>
          
          <FacilitiesSection>
            <h2>What this place offers</h2>
            <FacilitiesList>
              <FacilityItem>
                {venue.meta.wifi ? <FaCheck className="yes" /> : <FaTimes className="no" />}
                <span>Wifi</span>
              </FacilityItem>
              <FacilityItem>
                {venue.meta.parking ? <FaCheck className="yes" /> : <FaTimes className="no" />}
                <span>Parking</span>
              </FacilityItem>
              <FacilityItem>
                {venue.meta.breakfast ? <FaCheck className="yes" /> : <FaTimes className="no" />}
                <span>Breakfast</span>
              </FacilityItem>
              <FacilityItem>
                {venue.meta.pets ? <FaCheck className="yes" /> : <FaTimes className="no" />}
                <span>Pets allowed</span>
              </FacilityItem>
            </FacilitiesList>
          </FacilitiesSection>

          <LocationSection>
            <h2>Location</h2>
            <LocationDetails>
              <FaMapMarkerAlt />
              <div>
                <p>{venue.location.address}</p>
                <p>{venue.location.city}, {venue.location.country}</p>
                {venue.location.zip && <p>{venue.location.zip}</p>}
              </div>
            </LocationDetails>
          </LocationSection>
        </VenueDescription>

        <VenueDetails>
          <BookingSection>
            <BookingSectionHeader>
              <PriceRow>
                <span>${venue.price}</span> / night
              </PriceRow>
            </BookingSectionHeader>

            <BookingForm onSubmit={handleBooking}>
              <DateInputGroup>
                <label htmlFor="checkIn">Check-in</label>
                <input
                  type="date"
                  id="checkIn"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={today}
                  required
                />
              </DateInputGroup>

              <DateInputGroup>
                <label htmlFor="checkOut">Check-out</label>
                <input
                  type="date"
                  id="checkOut"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || today}
                  required
                />
              </DateInputGroup>

              <GuestInputGroup>
                <label htmlFor="guests">Guests</label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  required
                >
                  {[...Array(venue.maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </GuestInputGroup>

              <BookButton type="submit">
                Book now
              </BookButton>
            </BookingForm>
          </BookingSection>
        </VenueDetails>
      </VenueInfo>
    </VenueContainer>
  );
}

export default Venue;
