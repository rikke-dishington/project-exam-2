import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .react-datepicker {
    width: 100%;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: inherit;
    display: flex !important;
    justify-content: center;
  }

  .react-datepicker__month-container {
    float: none;
    width: 320px;
    margin: 0 8px;
  }

  .react-datepicker__header {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  .react-datepicker__month {
    margin: 0.4rem;
  }

  .react-datepicker__day-name {
    width: 2.5rem;
    line-height: 2.5rem;
    margin: 0.2rem;
  }

  .react-datepicker__day {
    width: 2.5rem;
    line-height: 2.5rem;
    margin: 0.2rem;
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main}20;
    }

    &--selected,
    &--in-selecting-range,
    &--in-range {
      background: ${({ theme }) => theme.colors.primary.main};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.colors.primary.dark};
      }
    }

    &--disabled {
      color: ${({ theme }) => theme.colors.text.disabled};
      background: ${({ theme }) => theme.colors.background.disabled};
      cursor: not-allowed;
      opacity: 1 !important;

      &:hover {
        background: ${({ theme }) => theme.colors.background.disabled};
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 768px) {
    .react-datepicker {
      flex-direction: column;
      align-items: center;
    }

    .react-datepicker__month-container {
      margin: 0;
      margin-bottom: 1rem;
    }
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`; 