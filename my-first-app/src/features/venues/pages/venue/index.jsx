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

/**
 * Venue Page Component
 * 
 * A detailed view page for a single venue. Displays comprehensive information
 * about the venue and provides booking functionality.
 * 
 * Features:
 * - Image carousel
 * - Venue details display
 * - Booking form
 * - Facilities list
 * - Host information
 * - Location details
 * - Loading states
 * - Error handling
 * - Responsive layout
 * 
 * State Management:
 * - Manages venue data fetching
 * - Handles loading and error states
 * - Integrates with booking store
 * - Cleans up booking state on unmount
 * 
 * Layout Structure:
 * - Top: Image carousel
 * - Left: Venue information
 *   - Header with name and rating
 *   - Description
 *   - Facilities
 *   - Location
 *   - Host info
 * - Right: Booking form
 * - Modal: Booking summary
 * 
 * @component
 * @example
 * ```jsx
 * <Routes>
 *   <Route path="/venue/:id" element={<Venue />} />
 * </Routes>
 * ```
 */
function Venue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearBooking } = useBookingStore();

  /**
   * Fetches venue data and handles state updates
   * Cleans up booking state on component unmount
   */
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

  if (isLoading) return <LoadingSpinner aria-label="Loading venue details">Loading...</LoadingSpinner>;
  if (error) return <ErrorMessage role="alert">{error}</ErrorMessage>;
  if (!venue) return <ErrorMessage role="alert">Venue not found</ErrorMessage>;

  const location = venue.location || {};
  const meta = venue.meta || {};

  /**
   * Transforms venue meta data into facilities array
   * for display in the facilities list
   */
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
              <p>{location.address}, {location.city}, {location.zip}, {location.country}</p>
            </AddressInfo>
          </Section>

          <VenueHostInfo owner={venue.owner} />
        </LeftColumn>

        <RightColumn>
          <BookingForm venue={venue} />
        </RightColumn>
      </ContentWrapper>

      <BookingSummaryModal venue={venue} />
    </VenueContainer>
  );
}

export default Venue;
