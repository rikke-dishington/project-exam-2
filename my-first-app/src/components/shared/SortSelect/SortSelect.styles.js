import styled from 'styled-components';

export const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

export const Select = styled.select`
  appearance: none;
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 1200px;
  margin: 0 auto 1rem auto;
`; 