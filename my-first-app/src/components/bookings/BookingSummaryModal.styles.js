import styled, { keyframes } from 'styled-components';

export const ModalOverlay = styled.div`
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
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const SummaryTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
`;

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;

  span:first-child {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 500;
  }
`;

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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ConfirmButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.colors.error};
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.error}15;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`; 