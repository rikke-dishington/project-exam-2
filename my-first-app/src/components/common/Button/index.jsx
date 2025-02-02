import styled, { css } from 'styled-components';

/**
 * Button Component
 * 
 * A versatile button component that supports multiple variants, sizes, and states.
 * Provides consistent styling and behavior for all interactive buttons in the application.
 * 
 * Features:
 * - Multiple variants (primary, secondary, outline, text, error)
 * - Different sizes (small, medium, large)
 * - Icon support
 * - Full width option
 * - Rounded corners option
 * - Disabled state
 * - Hover effects
 * 
 * Variants:
 * - primary: Main action button
 * - secondary: Alternative action button
 * - outline: Border-only button
 * - text: Text-only button
 * - error: Destructive action button
 * 
 * Props:
 * @param {string} variant - Button style variant ('primary', 'secondary', 'outline', 'text', 'error')
 * @param {string} size - Button size ('small', 'medium', 'large')
 * @param {boolean} fullWidth - Whether button should take full width
 * @param {boolean} rounded - Whether to use fully rounded corners
 * @param {boolean} disabled - Whether button is disabled
 * 
 * @example
 * ```jsx
 * <Button
 *   variant="primary"
 *   size="medium"
 *   onClick={handleClick}
 *   disabled={isLoading}
 * >
 *   <FaIcon /> Click Me
 * </Button>
 * ```
 */

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