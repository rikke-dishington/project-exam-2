import styled from 'styled-components';

export const VenueContainer = styled.main`
  margin: 0 100px;
  padding: 1rem;

  @media (max-width: 768px) {
    margin: 0 20px;
    padding: 0.5rem;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const VenueHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const VenueTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const VenueRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  
  svg {
    color: #FFD700;
    font-size: 1.2rem;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const RightColumn = styled.div`
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

export const VenueLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: 2rem;

  svg {
    font-size: 1.2rem;
  }
`;

export const VenueDescription = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

export const FacilitiesSection = styled.div`
  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 1rem;
  }
`;

export const FacilitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const FacilityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FacilityIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  svg {
    font-size: 1.2rem;
    color: ${({ hasFeature }) => hasFeature ? '#22c55e' : '#ef4444'};
  }
`;

export const BookingSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 2rem 0;
  font-size: 1rem;
  
  span:first-child {
    font-weight: 500;
  }
`;

export const MaxGuests = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  button {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: white;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.background.light};
    }
  }

  .book-button {
    background: #0073E6;
    color: white;
    border: none;

    &:hover {
      background: #0066CC;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const TotalPrice = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
`;

export const AddressContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    font-size: 1.2rem;
  }

  span {
    font-size: 1rem;
    line-height: 1.5;
    
    &:not(:last-child)::after {
      content: ',';
      margin-right: 0.3rem;
    }
  }
`;
