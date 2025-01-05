import styled from 'styled-components';

export const Section = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;