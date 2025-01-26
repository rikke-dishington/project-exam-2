import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.error : theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => 
      error ? theme.colors.error : theme.colors.primary.main};
  }
`;

export const ErrorMessage = styled.div`
  color: #FF0000;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export const FieldError = styled.span`
  color: #FF0000;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.primary.light};
    cursor: not-allowed;
  }
`;

export const RegisterLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`; 