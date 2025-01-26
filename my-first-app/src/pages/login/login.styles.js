import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 500px;
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  font-size: 2rem;
`;