import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaWifi, 
  FaParking, 
  FaCoffee, 
  FaPaw, 
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { getVenueById } from '../../utils/api/venues';
import {
  VenueContainer,
  ContentWrapper,
  LeftColumn,
  RightColumn,
  VenueHeader,
  VenueTitle,
  VenueRating,
  VenueLocation,
  VenueDescription,
  FacilitiesSection,
  FacilitiesList,
  FacilityItem,
  FacilityIcon,
  BookingSection,
  BookingForm,
  PriceInfo,
  LoadingSpinner,
  ErrorMessage,
  MaxGuests,
  AddressContent
} from './venue.styles';
import GuestSelector from '../../components/venues/GuestSelector';
import DateSelector from '../../components/venues/DateSelector';
import ImageCarousel from '../../components/venues/ImageCarousel';

function Venue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guests, setGuests] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueById(id);
        setVenue(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  const handleGuestChange = (newCount) => {
    setGuests(newCount);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    console.log('Date change:', start, end); // Debug log
    setStartDate(start);
    setEndDate(end);
  };

  const formatDateRange = () => {
    if (!startDate || !endDate) return 'Select dates';
    const formatDate = (date) => {
      if (!date) return '';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleDateButtonClick = (e) => {
    e.preventDefault();
    setShowDateSelector(prev => !prev);
  };

  const closeDateSelector = () => {
    setShowDateSelector(false);
  };

  if (isLoading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!venue) return <ErrorMessage>Venue not found</ErrorMessage>;

  return (
    <VenueContainer>
      {venue.media && venue.media.length > 0 && (
        <ImageCarousel images={venue.media} />
      )}

      <ContentWrapper>
        <LeftColumn>
          <VenueHeader>
            <div>
              <VenueTitle>{venue.name}</VenueTitle>
              {venue.rating && (
                <VenueRating>
                  <FaStar /> {venue.rating.toFixed(1)}
                </VenueRating>
              )}
            </div>
          </VenueHeader>

          <VenueDescription>
            <h2>About this venue</h2>
            <p>{venue.description}</p>
          </VenueDescription>

          <FacilitiesSection>
            <h2>Facilities</h2>
            <FacilitiesList>
              <FacilityItem>
                <FacilityIcon hasFeature={venue.meta?.wifi}>
                  {venue.meta?.wifi ? <FaCheck /> : <FaTimes />}
                </FacilityIcon>
                WiFi
              </FacilityItem>
              <FacilityItem>
                <FacilityIcon hasFeature={venue.meta?.parking}>
                  {venue.meta?.parking ? <FaCheck /> : <FaTimes />}
                </FacilityIcon>
                Parking
              </FacilityItem>
              <FacilityItem>
                <FacilityIcon hasFeature={venue.meta?.breakfast}>
                  {venue.meta?.breakfast ? <FaCheck /> : <FaTimes />}
                </FacilityIcon>
                Breakfast
              </FacilityItem>
              <FacilityItem>
                <FacilityIcon hasFeature={venue.meta?.pets}>
                  {venue.meta?.pets ? <FaCheck /> : <FaTimes />}
                </FacilityIcon>
                Pets allowed
              </FacilityItem>
            </FacilitiesList>
          </FacilitiesSection>

          <VenueDescription>
            <h2>Address</h2>
            <AddressContent>
              <FaMapMarkerAlt />
              {venue.location.address && <span>{venue.location.address}</span>}
              <span>{venue.location.city}</span>
              <span>{venue.location.country}</span>
              {venue.location.zip && <span>{venue.location.zip}</span>}
            </AddressContent>
          </VenueDescription>
        </LeftColumn>

        <RightColumn>
          <BookingSection>
            <h2>Book Your Stay</h2>
            <PriceInfo>
              <span>${venue.price} / night</span>
              <MaxGuests>{venue.maxGuests} guests</MaxGuests>
            </PriceInfo>
            
            <BookingForm onSubmit={(e) => e.preventDefault()}>
              <div style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  className="date-button"
                  onClick={handleDateButtonClick}
                >
                  {formatDateRange()}
                </button>
                {showDateSelector && (
                  <DateSelector
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateChange}
                    onClose={closeDateSelector}
                  />
                )}
              </div>
              
              <div style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  className="guest-button"
                  onClick={() => setShowGuestSelector(!showGuestSelector)}
                >
                  {guests} {guests === 1 ? 'guest' : 'guests'}
                </button>
                {showGuestSelector && (
                  <GuestSelector
                    guests={guests}
                    maxGuests={venue.maxGuests}
                    onChange={handleGuestChange}
                    onClose={() => setShowGuestSelector(false)}
                  />
                )}
              </div>

              <button 
                type="submit" 
                className="book-button"
                disabled={!startDate || !endDate}
              >
                Book Now
              </button>
            </BookingForm>
          </BookingSection>
        </RightColumn>
      </ContentWrapper>
    </VenueContainer>
  );
}

export default Venue;
