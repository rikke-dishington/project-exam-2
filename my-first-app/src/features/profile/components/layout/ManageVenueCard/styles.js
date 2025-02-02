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
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 500;
    margin-top: 0.5rem;
    
    span.amount {
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    span.label {
      color: ${({ theme }) => theme.colors.text.secondary};
      font-size: 0.9rem;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }
`;

export const IconButton = styled(Button)`
  flex: 1;
  justify-content: center;
  
  &:first-child {
    background: ${({ theme }) => theme.colors.success};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.success};
      opacity: 0.9;
    }
  }
  
  &:nth-child(2) {
    background: ${({ theme }) => theme.colors.primary.main};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary.main};
      opacity: 0.9;
    }
  }
  
  &:last-child {
    background: ${({ theme }) => theme.colors.error};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.error};
      opacity: 0.9;
    }
  }
`; 