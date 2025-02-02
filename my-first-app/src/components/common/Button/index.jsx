import styled, { css } from 'styled-components';

const getVariantStyles = ({ variant = 'primary', theme }) => {
  const variants = {
    primary: css`
      background-color: ${theme.colors.primary.main};
      color: ${theme.colors.primary.contrast};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary.main};
        opacity: 0.9;
      }
    `,
    secondary: css`
      background-color: ${theme.colors.secondary.main};
      color: ${theme.colors.secondary.contrast};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.secondary.main};
        opacity: 0.9;
      }
    `,
    outline: css`
      background-color: transparent;
      color: ${theme.colors.primary.main};
      border: 2px solid ${theme.colors.primary.main};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary.main}20;
      }
    `,
    text: css`
      background-color: transparent;
      color: ${theme.colors.primary.main};
      padding: ${theme.spacing[2]};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary.main}20;
      }
    `,
    error: css`
      background-color: ${theme.colors.error.main};
      color: ${theme.colors.error.contrast};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.error.main};
        opacity: 0.9;
      }
    `
  };
  return variants[variant];
};

const getSizeStyles = ({ size = 'medium', theme }) => {
  const sizes = {
    small: css`
      padding: ${theme.spacing[1]} ${theme.spacing[2]};
      font-size: ${theme.typography.fontSize.sm};
    `,
    medium: css`
      padding: ${theme.spacing[2]} ${theme.spacing[4]};
      font-size: ${theme.typography.fontSize.base};
    `,
    large: css`
      padding: ${theme.spacing[3]} ${theme.spacing[6]};
      font-size: ${theme.typography.fontSize.lg};
    `
  };
  return sizes[size];
};

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  white-space: nowrap;
  text-decoration: none;
  
  ${getVariantStyles}
  ${getSizeStyles}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  ${({ rounded }) => rounded && css`
    border-radius: ${({ theme }) => theme.borderRadius.full};
  `}

  svg {
    font-size: 1.1em;
  }
`;

export default Button; 