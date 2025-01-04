import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background.footer};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const Copyright = styled.div`
  color: ${({ theme }) => theme.colors.text.footer};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;