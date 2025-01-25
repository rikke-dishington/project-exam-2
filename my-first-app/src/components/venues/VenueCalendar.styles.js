import styled from 'styled-components';

export const CalendarContainer = styled.div`
  .react-datepicker {
    font-family: inherit;
    border: none;
    width: 100%;
    background: transparent;
  }

  .react-datepicker__month-container {
    float: left;
    width: 50%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0.5rem;
  }

  .react-datepicker__header {
    background: white;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 1rem 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .react-datepicker__current-month {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .react-datepicker__day-names {
    margin-top: 0.5rem;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.text.secondary};
    width: 2.5rem;
    margin: 0.2rem;
  }

  .react-datepicker__month {
    margin: 0.4rem;
  }

  .react-datepicker__day {
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: 0.2rem;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.text.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.light};
      color: white;
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: white;
  }

  .react-datepicker__day--in-selecting-range {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: white;
  }

  .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text.disabled};
    }
  }

  .react-datepicker__navigation {
    top: 1rem;
    
    &:hover {
      cursor: pointer;
    }
  }

  .react-datepicker__navigation--previous {
    left: 1rem;
  }

  .react-datepicker__navigation--next {
    right: 1rem;
  }

  @media (max-width: 768px) {
    .react-datepicker__month-container {
      width: 100%;
      margin: 0.5rem 0;
    }
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
`; 