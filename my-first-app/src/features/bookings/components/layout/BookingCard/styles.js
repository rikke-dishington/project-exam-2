import styled from 'styled-components';

export const Card = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BookingInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const VenueInfo = styled.div`
  margin-bottom: 1rem;
`;

export const VenueName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const DateRange = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  div {
    color: ${({ theme }) => theme.colors.text.primary};

    strong {
      color: ${({ theme }) => theme.colors.text.secondary};
      font-weight: normal;
    }
  }
`;

export const GuestInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    font-size: 0.9rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
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
  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EditButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const DeleteButton = styled(Button)`
  background: ${({ theme }) => theme.colors.error};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.error}dd;
  }
`; 