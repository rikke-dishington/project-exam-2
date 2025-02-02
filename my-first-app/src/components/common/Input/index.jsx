import styled, { css } from 'styled-components';

/**
 * Input Component
 * 
 * A flexible input component with support for various styles, states, and feedback.
 * Provides a consistent interface for text input across the application.
 * 
 * Features:
 * - Multiple variants (outlined, filled)
 * - Different sizes (small, medium, large)
 * - Error state handling
 * - Helper text support
 * - Label support
 * - Full width option
 * - Rounded corners option
 * - Disabled state
 * 
 * Props:
 * @param {string} label - Input label text
 * @param {string} error - Error message to display
 * @param {string} helperText - Helper text to display below input
 * @param {boolean} fullWidth - Whether input should take full width
 * @param {string} variant - Input style variant ('outlined', 'filled')
 * @param {string} size - Input size ('small', 'medium', 'large')
 * @param {boolean} rounded - Whether to use fully rounded corners
 * @param {boolean} disabled - Whether input is disabled
 * 
 * @example
 * ```jsx
 * <Input
 *   label="Username"
 *   helperText="Enter your username"
 *   error={errors.username}
 *   value={username}
 *   onChange={handleChange}
 *   fullWidth
 *   size="medium"
 * />
 * ```
 */

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const HelperText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.error.main : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.hint};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => 
      error ? theme.colors.error.main : theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme, error }) => 
      error ? theme.colors.error.main + '20' : theme.colors.primary.main + '20'};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.disabled};
    cursor: not-allowed;
  }

  ${({ variant, theme }) =>
    variant === 'filled' &&
    css`
      background-color: ${theme.colors.background.secondary};
      border: none;

      &:focus {
        background-color: ${theme.colors.background.paper};
      }
    `}

  ${({ size, theme }) => {
    const sizes = {
      small: css`
        padding: ${theme.spacing[1]} ${theme.spacing[2]};
        font-size: ${theme.typography.fontSize.sm};
      `,
      medium: css`
        padding: ${theme.spacing[2]} ${theme.spacing[3]};
        font-size: ${theme.typography.fontSize.base};
      `,
      large: css`
        padding: ${theme.spacing[3]} ${theme.spacing[4]};
        font-size: ${theme.typography.fontSize.lg};
      `
    };
    return sizes[size || 'medium'];
  }}

  ${({ rounded, theme }) =>
    rounded &&
    css`
      border-radius: ${theme.borderRadius.full};
    `}
`;

const Input = ({ 
  label,
  error,
  helperText,
  fullWidth = false,
  ...props 
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput error={error} fullWidth={fullWidth} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputWrapper>
  );
};

export default Input; 