import styled from 'styled-components';

export const VenueContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

export const LeftColumn = styled.div``;

export const RightColumn = styled.div`
  @media (max-width: 768px) {
    grid-row: 1;
  }
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const VenueDescription = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AddressInfo = styled.div`
  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  padding: 2rem;
  font-size: 1.2rem;
`;