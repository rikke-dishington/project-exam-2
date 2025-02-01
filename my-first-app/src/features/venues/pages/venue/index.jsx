import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { venueApi } from '../../api/venues';
import useBookingStore from '../../../bookings/stores/booking';
import { BookingForm } from '../../../bookings/components';
import { BookingSummaryModal } from '../../../bookings/components';
import {
  VenueImageCarousel,
  VenueHeader,
  VenueFacilities,
  VenueHostInfo
} from '../../components';
import {
  VenueContainer,
  ContentWrapper,
  LeftColumn,
  RightColumn,
  Section,
  SectionTitle,
  VenueDescription,
  AddressInfo,
  LoadingSpinner,
  ErrorMessage,
} from './styles';

function Venue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return (
    <VenueContainer>
      <VenueImageCarousel images={venue.media} />
      
      <ContentWrapper>
        <LeftColumn>
          <VenueHeader 
            name={venue.name}
            location={location}
            rating={venue.rating}
          />

          <Section>
            <SectionTitle>Description</SectionTitle>
            <VenueDescription>{venue.description}</VenueDescription>
          </Section>

          <VenueFacilities facilities={facilities} />

          <Section>
            <SectionTitle>Location</SectionTitle>
            <AddressInfo>
              <p>{location.address}</p>
              <p>{location.city}, {location.zip}</p>
              <p>{location.country}</p>
            </AddressInfo>
          </Section>

          <VenueHostInfo owner={venue.owner} />
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
