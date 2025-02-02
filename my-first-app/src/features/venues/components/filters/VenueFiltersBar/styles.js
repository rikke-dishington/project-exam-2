import styled from 'styled-components';

export const FiltersSection = styled.div`
  display: flex;
  align-items: center;
`;

export const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const FilterButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.text.secondary};
  }

  svg {
    font-size: 1.1rem;
  }
`;

export const ActiveFilterDot = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
`; 