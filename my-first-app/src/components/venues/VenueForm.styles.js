import styled from 'styled-components';

export const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
`;

export const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
  }
`;

export const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
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

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ error }) => 
    error ? '#dc3545' : '#dee2e6'};
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ error }) => 
      error ? '#dc3545' : '#0d6efd'};
    box-shadow: 0 0 0 2px ${({ error }) => 
      error ? 'rgba(220, 53, 69, 0.25)' : 'rgba(13, 110, 253, 0.25)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ error, theme }) => 
    error ? theme.colors.error : theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ error, theme }) => 
      error ? theme.colors.error : theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ error, theme }) => 
      error ? `${theme.colors.error}33` : `${theme.colors.primary.main}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
`;

export const ImageSection = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.error};
    transition: all 0.2s ease;

    &:hover {
      background: white;
      transform: scale(1.1);
    }
  }
`;

export const AddImageButton = styled.button`
  aspect-ratio: 1;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all 0.2s ease;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const LocationGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const PriceGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  flex: 1;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.error}15;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

export const ValidationMessage = styled.div`
  color: #dc3545 !important;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #dc3545 !important;
    font-size: 1rem;
  }
`;

export const FacilitiesGroup = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .facilities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }
`;

export const CheckboxGroup = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.primary};
    
    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
`;
