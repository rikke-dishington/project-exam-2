import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 2rem;
  margin-top: ${props => props.$past ? '4rem' : '0'};
  
  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const NoBookingsMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text.secondary};

  p {
    margin: 0;
  }
`; 