import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
`;

export const Spinner = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '20px';
      case 'large': return '50px';
      default: return '35px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '20px';
      case 'large': return '50px';
      default: return '35px';
    }
  }};
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`; 