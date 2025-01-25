import styled from 'styled-components';

export const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  input {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 1rem;
    cursor: pointer;
  }

  .react-datepicker {
    font-family: inherit;
  }
`;

export const DatePickerFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  background: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const FooterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant, theme }) =>
    variant === 'primary'
      ? `
    background: ${theme.colors.primary.main};
    color: white;
    
    &:hover {
      background: ${theme.colors.primary.dark};
    }
  `
      : `
    background: white;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.text.primary};
    
    &:hover {
      background: ${theme.colors.background.light};
    }
  `}

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
  }
`; 