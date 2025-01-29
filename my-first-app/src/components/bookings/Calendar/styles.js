import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CalendarWrapper = styled.div`
  .react-datepicker {
    font-family: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  .side-by-side {
    display: flex;
    
    .react-datepicker__month-container {
      width: 320px;  // Fixed width for each month
    }
  }

  .react-datepicker__month-container {
    padding: 0.5rem;
  }

  .react-datepicker__day {
    width: 2.5rem;
    line-height: 2.5rem;
    margin: 0.2rem;
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.light};
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.colors.text.disabled};
    text-decoration: line-through;
    cursor: not-allowed;

    &:hover {
      background: none;
    }
  }
`;

export const DatePickerButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

export const LoginPrompt = styled.div`
  text-align: center;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

export const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const CalendarOverlay = styled.div`
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

export const CalendarModal = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: fit-content;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) => variant === 'secondary' ? `
    background: white;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.background.secondary};
    }
  ` : `
    background: ${({ theme }) => theme.colors.primary.main};
    border: none;
    color: white;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary.dark};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `}
`; 