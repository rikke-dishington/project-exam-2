import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const BookingDetails = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const DateRange = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};

  div {
    margin: 0.5rem 0;
  }
`;

export const GuestCount = styled.div`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PriceBreakdown = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1rem;
  margin-bottom: 1rem;

  div {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const CancelButton = styled(Button)`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const ConfirmButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary.main};
  border: none;
  color: white;
  flex: 1;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LoginButton = styled(ConfirmButton)`
  background: #4a90e2;

  &:hover:not(:disabled) {
    background: #357abd;
  }
`;