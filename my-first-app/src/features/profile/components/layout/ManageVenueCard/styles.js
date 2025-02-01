import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const VenueImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const VenueDetails = styled.div`
  padding: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.25rem;
  }

  p {
    margin: 0.25rem 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }

  .price {
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 500;
    margin-top: 0.5rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: ${({ $danger, theme }) => 
    $danger ? theme.colors.error + '20' : theme.colors.background.secondary};
  color: ${({ $danger, theme }) => 
    $danger ? theme.colors.error : theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $danger, theme }) => 
      $danger ? theme.colors.error + '30' : theme.colors.background.primary};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1rem;
  }
`; 