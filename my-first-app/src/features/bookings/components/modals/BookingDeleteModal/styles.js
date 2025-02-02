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

export const Message = styled.div`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};

  p {
    margin: 0.5rem 0;

    &:last-child {
      color: ${({ theme }) => theme.colors.text.secondary};
      font-size: 0.9rem;
    }
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.colors.success};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.success}dd;
  }
`;

export const DeleteButton = styled(Button)`
  background: ${({ theme }) => theme.colors.error};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.error}dd;
  }
`; 