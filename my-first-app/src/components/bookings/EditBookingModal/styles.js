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
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

export const GuestInput = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled(Button)`
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
    background: ${({ theme }) => theme.colors.error}dd;
  }
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  text-align: center;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  gap: 1rem;
  
  .react-datepicker-wrapper {
    flex: 1;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const VenueInfo = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.secondary};

    strong {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

export const PriceInfo = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};

    &:last-child {
      margin-bottom: 0;
    }

    &.total {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: 1.1rem;
    }
  }
`; 