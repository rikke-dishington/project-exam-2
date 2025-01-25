import styled from 'styled-components';

export const BookingFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SelectionWrapper = styled.div`
  position: relative;
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: white;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.light};
  }
`;

export const DateButton = styled(Button)``;

export const GuestButton = styled(Button)``;

export const PriceSummary = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 0;
  margin: 1rem 0;
`;

export const PriceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TotalPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const BookButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.error}15;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
`;

export const FormHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

export const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const PricePerNight = styled.span`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const MaxGuests = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`; 