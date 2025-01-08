import styled from 'styled-components';

export const LoadMoreButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  border: none;
  border-radius: 24px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;
