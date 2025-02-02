import PropTypes from 'prop-types';
import {
  Modal,
  ModalContent,
  InputGroup,
  Label,
  Input,
  ImagePreview,
  Checkbox,
  SaveButton,
  ErrorMessage
} from './styles';

/**
 * ProfileEditModal Component
 * 
 * A modal component for editing user profile information.
 * Allows users to update their banner image, avatar, bio, and venue manager status.
 * 
 * Features:
 * - Image URL inputs with previews
 * - Bio text area
 * - Venue manager toggle
 * - Form validation
 * - Loading state handling
 * - Error display
 * - Responsive design
 * - Click outside to close
 * 
 * @component
 * @example
 * ```jsx
 * <ProfileEditModal
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 *   formData={{
 *     banner: 'https://example.com/banner.jpg',
 *     avatar: 'https://example.com/avatar.jpg',
 *     bio: 'Hello, world!',
 *     venueManager: false
 *   }}
 *   onChange={(e) => handleChange(e)}
 *   onSubmit={(e) => handleSubmit(e)}
 *   error={null}
 *   isLoading={false}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Object} props.formData - Form data object
 * @param {string} props.formData.banner - Banner image URL
 * @param {string} props.formData.avatar - Avatar image URL
 * @param {string} props.formData.bio - User biography
 * @param {boolean} props.formData.venueManager - Venue manager status
 * @param {Function} props.onChange - Form field change handler
 * @param {Function} props.onSubmit - Form submission handler
 * @param {string|null} props.error - Error message to display
 * @param {boolean} props.isLoading - Whether form is submitting
 */
function ProfileEditModal({ 
  isOpen, 
  onClose, 
  formData, 
  onChange, 
  onSubmit, 
  error, 
  isLoading 
}) {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose} role="dialog" aria-label="Edit profile">
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <Label htmlFor="banner">Banner URL</Label>
            <Input
              id="banner"
              type="url"
              name="banner"
              value={formData.banner}
              onChange={onChange}
              placeholder="Enter banner image URL"
              aria-label="Banner image URL"
            />
            {formData.banner && (
              <ImagePreview>
                <img src={formData.banner} alt="Banner preview" />
              </ImagePreview>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={onChange}
              placeholder="Enter avatar image URL"
              aria-label="Avatar image URL"
            />
            {formData.avatar && (
              <ImagePreview $isAvatar>
                <img src={formData.avatar} alt="Avatar preview" />
              </ImagePreview>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              as="textarea"
              name="bio"
              value={formData.bio}
              onChange={onChange}
              placeholder="Tell us about yourself"
              rows="3"
              aria-label="Biography"
            />
          </InputGroup>

          <InputGroup>
            <Checkbox>
              <input
                type="checkbox"
                id="venueManager"
                name="venueManager"
                checked={formData.venueManager}
                onChange={onChange}
                aria-label="Become a venue manager"
              />
              <span>I want to be a venue manager</span>
            </Checkbox>
          </InputGroup>

          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

          <SaveButton 
            type="submit" 
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </form>
      </ModalContent>
    </Modal>
  );
}

ProfileEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    banner: PropTypes.string,
    avatar: PropTypes.string,
    bio: PropTypes.string,
    venueManager: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

export default ProfileEditModal; 