import styled, { css } from 'styled-components';

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