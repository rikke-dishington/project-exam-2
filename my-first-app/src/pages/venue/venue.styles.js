import styled from 'styled-components';

export const VenueContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const VenueHeader = styled.div`
  margin-bottom: 4rem;
`;

export const VenueTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const VenueSubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.text.footer};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      font-size: 1.5rem;

      &.fa-star {
        color: ${({ theme }) => theme.colors.yellow};
      }
      &.fa-wifi {
        color: ${({ theme }) => theme.colors.primary};
      }
      &.fa-parking {
        color: ${({ theme }) => theme.colors.primary};
      }
      &.fa-coffee {
        color: #8B4513;
      }
      &.fa-paw {
        color: #FF8C00;
      }
    }

    &:nth-child(even) {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.text.footer};
      opacity: 0.5;
    }
  }
`;

export const VenueLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.text.footer};
  font-size: 1.1rem;

  svg {
    font-size: 1rem;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const HeartButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  
  svg {
    font-size: 24px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

export const ImageGallery = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  .slick-dots {
    bottom: 16px;
    
    li button:before {
      color: white;
      font-size: 10px;
      opacity: 0.8;
    }
    
    li.slick-active button:before {
      color: white;
      opacity: 1;
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
    
    &:before {
      font-size: 40px;
      opacity: 0.8;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &:hover:before {
      opacity: 1;
    }
  }

  .slick-prev {
    left: 16px;
  }

  .slick-next {
    right: 16px;
  }
`;

export const VenueImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

export const VenueInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;

export const VenueDescription = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 2rem;
  }
`;

export const VenueDetails = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const DescriptionSection = styled(Section)`
  margin-top: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const LocationSection = styled(Section)`
`;

export const LocationDetails = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  
  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin: 0;
    line-height: 1.5;
  }
`;

export const FacilitiesSection = styled(Section)``;

export const FacilitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FacilityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    font-size: 1.5rem;
    
    &.yes {
      color: ${({ theme }) => theme.colors.success || '#28a745'};
    }
    
    &.no {
      color: ${({ theme }) => theme.colors.error || '#dc3545'};
    }
  }
`;

export const BookingSection = styled.div`
  padding: 1.5rem;
`;

export const BookingSectionHeader = styled.div`
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const PriceRow = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    font-weight: 600;
  }
`;

export const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text.footer};
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const GuestInputGroup = styled(DateInputGroup)`
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 1rem;
    background: white;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const BookButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const BookingNote = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.footer};
`;
