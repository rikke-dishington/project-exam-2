import styled, { css } from 'styled-components';

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  width: 100%;
  
  ${({ variant, theme }) => {
    const variants = {
      outlined: css`
        border: 1px solid ${theme.colors.border};
      `,
      elevated: css`
        box-shadow: ${theme.shadows.base};
      `,
      flat: css`
        background: ${theme.colors.background.secondary};
      `
    };
    return variants[variant || 'elevated'];
  }}

  ${({ hoverable, theme }) =>
    hoverable &&
    css`
      transition: transform ${theme.transitions.base},
                 box-shadow ${theme.transitions.base};
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: ${theme.shadows.lg};
      }
    `}

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${({ compact, theme }) =>
    compact &&
    css`
      padding: ${theme.spacing[3]};
    `}
`;

const CardMedia = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || '200px'};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ overlay }) =>
    overlay &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.7) 100%
        );
      }
    `}
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};

  ${({ compact, theme }) =>
    compact &&
    css`
      padding: ${theme.spacing[3]};
    `}
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background.secondary};

  ${({ compact, theme }) =>
    compact &&
    css`
      padding: ${theme.spacing[3]};
    `}
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const CardSubtitle = styled.h4`
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const Card = {
  Wrapper: CardWrapper,
  Header: CardHeader,
  Media: CardMedia,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Subtitle: CardSubtitle
};

export default Card; 