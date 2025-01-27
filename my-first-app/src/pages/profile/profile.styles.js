import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ProfileHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ProfileInfo = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h2 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`; 