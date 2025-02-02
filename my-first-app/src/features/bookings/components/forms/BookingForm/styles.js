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
  border: 1px solid ${({ theme }) => theme.colors.border};
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 2rem;
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
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const DatePickerButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.background.disabled};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const SelectedDates = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.success}15;
  border: 1px solid ${({ theme }) => theme.colors.success}30;
  border-radius: 8px;
  margin-bottom: 1rem;

  div {
    margin: 0.25rem 0;
    color: ${({ theme }) => theme.colors.text.primary};

    strong {
      color: ${({ theme }) => theme.colors.text.secondary};
      font-weight: normal;
      margin-right: 0.5rem;
    }
  }
`; 