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
  max-width: 800px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const VenueInfo = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.secondary};

    strong {
      color: ${({ theme }) => theme.colors.text.primary};
      margin-right: 0.5rem;
    }
  }
`;

export const CalendarSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main};
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
    }
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;

  svg {
    color: ${({ theme }) => theme.colors.success};
  }
`;

export const PriceInfo = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.success}15;
  border: 1px solid ${({ theme }) => theme.colors.success}30;
  border-radius: 8px;
  margin-top: 1rem;

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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
`;

export const CancelButton = styled(Button)`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const SaveButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary.main};
  border: none;
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.main};
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
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