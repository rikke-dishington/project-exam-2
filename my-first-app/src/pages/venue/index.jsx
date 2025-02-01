import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUser
} from 'react-icons/fa';
import { venueApi } from '../../utils/api/venues';
import useBookingStore from '../../stores/bookingStore';
import BookingForm from '../../components/bookings/BookingForm';
import BookingSummaryModal from '../../components/bookings/BookingSummaryModal';
import {
  VenueContainer,
  ImageSection,
  ImageWrapper,
  VenueImage,
  ImageButton,
  ImageDots,
  ImageDot,
  ContentWrapper,
  LeftColumn,
  RightColumn,
  VenueHeader,
  VenueTitle,
  VenueSubHeader,
  VenueRating,
  VenueLocation,
  VenueDescription,
  Section,
  SectionTitle,
  FacilitiesList,
  FacilityItem,
  FacilityIcon,
  LoadingSpinner,
  ErrorMessage,
  AddressInfo,
  HostSection,
  HostInfo,
  HostAvatar,
  HostName,
  HostStats
} from './index.styles';

function Venue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { clearBooking } = useBookingStore();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await venueApi.getById(id);
        const data = response.data || response;
        setVenue(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
    return () => clearBooking();
  }, [id, clearBooking]);

  if (isLoading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!venue) return <ErrorMessage>Venue not found</ErrorMessage>;

  const location = venue.location || {};
  const meta = venue.meta || {};

  const facilities = [
    { name: 'WiFi', available: meta.wifi },
    { name: 'Parking', available: meta.parking },
    { name: 'Breakfast', available: meta.breakfast },
    { name: 'Pets allowed', available: meta.pets }
  ];

  const images = venue.media && venue.media.length > 0
    ? venue.media
    : [{ 
        url: 'https://placehold.co/600x400?text=No+Image+Available',
        alt: 'No image available'
      }];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <VenueContainer>
      <ImageSection>
        <ImageWrapper>
          <VenueImage 
            src={images[currentImageIndex].url} 
            alt={images[currentImageIndex].alt}
          />
          {images.length > 1 && (
            <>
              <ImageButton direction="left" onClick={handlePrevious}>
                <FaChevronLeft />
              </ImageButton>
              <ImageButton direction="right" onClick={handleNext}>
                <FaChevronRight />
              </ImageButton>
              <ImageDots>
                {images.map((_, index) => (
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

      <ContentWrapper>
        <LeftColumn>
          <VenueHeader>
            <VenueTitle>{venue.name}</VenueTitle>
            <VenueSubHeader>
              <VenueLocation>
                <FaMapMarkerAlt />
                {location.city}, {location.country}
              </VenueLocation>
              {venue.rating && (
                <VenueRating>
                  <FaStar /> {venue.rating.toFixed(1)}
                </VenueRating>
              )}
            </VenueSubHeader>
          </VenueHeader>

          <Section>
            <SectionTitle>Description</SectionTitle>
            <VenueDescription>{venue.description}</VenueDescription>
          </Section>

          <Section>
            <SectionTitle>Facilities</SectionTitle>
            <FacilitiesList>
              {facilities.map(({ name, available }) => (
                <FacilityItem key={name}>
                  <FacilityIcon available={available}>
                    {available ? <FaCheck /> : <FaTimes />}
                  </FacilityIcon>
                  <span>{name}</span>
                </FacilityItem>
              ))}
            </FacilitiesList>
          </Section>

          <Section>
            <SectionTitle>Location</SectionTitle>
            <AddressInfo>
              <p>{location.address}</p>
              <p>{location.city}, {location.zip}</p>
              <p>{location.country}</p>
            </AddressInfo>
          </Section>

          <Section>
            <SectionTitle>Host</SectionTitle>
            <HostSection>
              <HostInfo>
                <HostAvatar>
                  {venue.owner?.avatar?.url ? (
                    <img 
                      src={venue.owner.avatar.url} 
                      alt={venue.owner.avatar.alt || `${venue.owner.name}'s avatar`} 
                    />
                  ) : (
                    <FaUser />
                  )}
                </HostAvatar>
                <div>
                  <HostName>{venue.owner?.name || 'Anonymous Host'}</HostName>
                </div>
              </HostInfo>
            </HostSection>
          </Section>
        </LeftColumn>

        <RightColumn>
          <BookingForm venue={venue} />
        </RightColumn>
      </ContentWrapper>

      <BookingSummaryModal />
    </VenueContainer>
  );
}

export default Venue;
