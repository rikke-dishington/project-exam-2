import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  background: ${({ $success, theme }) => 
    $success ? theme.colors.success + '20' : theme.colors.error + '20'};
  color: ${({ $success, theme }) => 
    $success ? theme.colors.success : theme.colors.error};
  border-radius: 4px;
  text-align: center;
`;

export const NoVenuesMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  margin-top: 2rem;
`; 