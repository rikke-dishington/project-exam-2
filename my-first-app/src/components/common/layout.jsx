import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.large};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;