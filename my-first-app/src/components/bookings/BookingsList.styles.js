import styled from 'styled-components';

export const BookingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BookingCard = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    color: ${props => props.theme.colors.text};
  }

  .status {
    font-size: 0.875rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: ${props => props.theme.colors.primary}20;
    color: ${props => props.theme.colors.primary};
  }
`;

export const BookingDetails = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;

  .price {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid ${props => props.theme.colors.border};
    
    strong {
      color: ${props => props.theme.colors.primary};
      font-size: 1.125rem;
    }
  }
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.text};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

export const BookingActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${props => props.theme.colors.error};
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  text-align: center;
  padding: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.text};

  p:first-child {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  p:last-child {
    color: ${props => props.theme.colors.textLight};
  }
`;
