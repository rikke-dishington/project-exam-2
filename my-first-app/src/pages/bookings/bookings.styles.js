import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const BookingsHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const BookingsList = styled.div`
  display: grid;
  gap: 1rem;
`; 