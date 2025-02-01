import styled from 'styled-components';

export const GuestSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  margin: 1rem 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'default')};
`;

export const GuestInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  ${({ $disabled }) => $disabled && `
    opacity: 0.7;
  `}
`;

export const GuestControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const GuestCount = styled.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const GuestButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 0.8rem;
  }
`; 