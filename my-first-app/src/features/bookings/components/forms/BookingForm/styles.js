import styled from 'styled-components';

export const Header = styled.div`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

export const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
`;

export const PriceDisplay = styled.div`
  .amount {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .label {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

export const GuestLimit = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const FormContainer = styled.div`
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const BookButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`; 