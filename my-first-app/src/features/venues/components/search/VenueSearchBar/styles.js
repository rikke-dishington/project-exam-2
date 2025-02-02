import styled from 'styled-components';

export const SearchContainer = styled.form`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 0.5rem;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  padding-right: 2.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const SearchButton = styled.button`
  padding: 0 1.5rem;
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 