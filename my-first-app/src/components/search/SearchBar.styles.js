import styled from 'styled-components';

export const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: left;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InputGroup = styled.div`
  flex: 1;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  input, select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: flex-end;
  padding: 0;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

export const HomeSearchWrapper = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 16px;
  padding: 3rem;
  max-width: 1200px;
  margin: 1rem auto;
`;

export const SearchTitle = styled.h1`
  color: white;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;