import { SpinnerContainer, Spinner, LoadingText } from './styles';

function LoadingSpinner({ text = 'Loading...', size = 'medium' }) {
  return (
    <SpinnerContainer>
      <Spinner size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
}

export default LoadingSpinner; 