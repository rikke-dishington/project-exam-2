import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { getVenueById } from '../../utils/api/venues';
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
  AddressInfo
} from './venue.styles';

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
        const data = await getVenueById(id);
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

  const facilities = [
    { name: 'WiFi', available: venue.meta.wifi },
    { name: 'Parking', available: venue.meta.parking },
    { name: 'Breakfast', available: venue.meta.breakfast },
    { name: 'Pets allowed', available: venue.meta.pets }
  ];

  const images = venue.media && venue.media.length > 0
    ? venue.media.map(url => ({ url }))
    : [{ url: 'https://placehold.co/600x400?text=No+Image+Available' }];

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
            alt={`Venue image ${currentImageIndex + 1}`}
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
                {venue.location.city}, {venue.location.country}
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
              <p>{venue.location.address}</p>
              <p>{venue.location.city}, {venue.location.zip}</p>
              <p>{venue.location.country}</p>
            </AddressInfo>
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
