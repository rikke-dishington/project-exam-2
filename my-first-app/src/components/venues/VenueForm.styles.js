import styled from 'styled-components';

export const FormOverlay = styled.div`
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

export const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.footer};
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

export const FormBody = styled.form`
  padding: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  .checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.5rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  .image-previews {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[type="number"] {
    width: 200px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(SubmitButton)`
  background: #6c757d;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.error}20;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem;
`;

export const ImagePreview = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const ImageUpload = styled.div`
  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;
