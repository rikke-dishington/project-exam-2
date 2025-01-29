import styled from 'styled-components';

export const VenueContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const ImageSection = styled.section`
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
`;

export const VenueImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => direction === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ImageDots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
`;

export const ImageDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => 
    active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background: white;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const RightColumn = styled.div`
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

export const VenueHeader = styled.header`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const VenueTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

export const VenueSubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const VenueLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const VenueRating = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: #fbbf24;
  }
`;

export const VenueDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  margin: 0;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

export const FacilitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FacilityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FacilityIcon = styled.span`
  display: flex;
  align-items: center;
  
  svg {
    font-size: 1.2rem;
    color: ${({ available }) => 
      available ? '#22c55e' : '#ef4444'};
  }
`;

export const AddressInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;

  p {
    margin: 0.25rem 0;
  }
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

export const HostSection = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
`;

export const HostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HostAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    width: 32px;
    height: 32px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const HostName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;