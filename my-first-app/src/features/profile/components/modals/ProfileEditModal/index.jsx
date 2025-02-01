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
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <Label>Banner URL</Label>
            <Input
              type="url"
              name="banner"
              value={formData.banner}
              onChange={onChange}
              placeholder="Enter banner image URL"
            />
            {formData.banner && (
              <ImagePreview>
                <img src={formData.banner} alt="Banner preview" />
              </ImagePreview>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Avatar URL</Label>
            <Input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={onChange}
              placeholder="Enter avatar image URL"
            />
            {formData.avatar && (
              <ImagePreview $isAvatar>
                <img src={formData.avatar} alt="Avatar preview" />
              </ImagePreview>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Bio</Label>
            <Input
              as="textarea"
              name="bio"
              value={formData.bio}
              onChange={onChange}
              placeholder="Tell us about yourself"
              rows="3"
            />
          </InputGroup>

          <InputGroup>
            <Checkbox>
              <input
                type="checkbox"
                name="venueManager"
                checked={formData.venueManager}
                onChange={onChange}
              />
              <span>I want to be a venue manager</span>
            </Checkbox>
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SaveButton type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ProfileEditModal; 