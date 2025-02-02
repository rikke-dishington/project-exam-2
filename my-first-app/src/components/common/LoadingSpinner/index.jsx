import { SpinnerContainer, Spinner, LoadingText } from './styles';

/**
 * LoadingSpinner Component
 * 
 * A flexible loading indicator component that provides visual feedback
 * during asynchronous operations.
 * 
 * Features:
 * - Customizable loading text
 * - Multiple sizes
 * - Centered layout
 * - Animated spinner
 * 
 * Props:
 * @param {string} [text='Loading...'] - Text to display below spinner
 * @param {string} [size='medium'] - Size of the spinner ('small', 'medium', 'large')
 * 
 * @example
 * ```jsx
 * // Default usage
 * <LoadingSpinner />
 * 
 * // Custom text and size
 * <LoadingSpinner 
 *   text="Fetching data..." 
 *   size="large" 
 * />
 * ```
 */
function LoadingSpinner({ text = 'Loading...', size = 'medium' }) {
  return (
    <SpinnerContainer>
      <Spinner size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
}

export default LoadingSpinner; 