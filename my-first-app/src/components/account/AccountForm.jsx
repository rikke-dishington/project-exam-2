import { useState, useEffect } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import {
  FormOverlay,
  FormContainer,
  Form,
  Title,
  InputGroup,
  Input,
  TextArea,
  ValidationMessage,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  ErrorMessage
} from './AccountForm.styles';

function AccountForm({ profile, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: {
      url: '',
      alt: ''
    },
    bio: '',
    venueManager: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        avatar: {
          url: profile.avatar?.url || '',
          alt: profile.avatar?.alt || `Avatar for ${profile.name}`
        },
        bio: profile.bio || '',
        venueManager: profile.venueManager || false
      });
    }
  }, [profile]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.avatar.url && !isValidUrl(formData.avatar.url)) {
      newErrors.avatar = 'Invalid avatar URL format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'avatar') {
      setFormData(prev => ({
        ...prev,
        avatar: {
          url: value,
          alt: `Avatar for ${prev.name}`
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const profileData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      bio: formData.bio.trim(),
      venueManager: Boolean(formData.venueManager),
      avatar: formData.avatar.url ? {
        url: formData.avatar.url.trim(),
        alt: `Avatar for ${formData.name.trim()}`
      } : undefined
    };

    setIsLoading(true);
    try {
      await onSubmit(profileData);
      onClose();
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <FormContainer>
        <Title>
          Edit Profile
          <button onClick={onClose}><FiX /></button>
        </Title>

        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <h3>Name</h3>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            {errors.name && (
              <ValidationMessage>
                <FiAlertCircle /> {errors.name}
              </ValidationMessage>
            )}
          </InputGroup>

          <InputGroup>
            <h3>Email</h3>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && (
              <ValidationMessage>
                <FiAlertCircle /> {errors.email}
              </ValidationMessage>
            )}
          </InputGroup>

          <InputGroup>
            <h3>Avatar URL</h3>
            <Input
              type="url"
              name="avatar"
              value={formData.avatar.url}
              onChange={handleChange}
              error={errors.avatar}
            />
            {errors.avatar && (
              <ValidationMessage>
                <FiAlertCircle /> {errors.avatar}
              </ValidationMessage>
            )}
          </InputGroup>

          <InputGroup>
            <h3>Bio</h3>
            <TextArea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              error={errors.bio}
            />
          </InputGroup>

          <InputGroup>
            <label>
              <input
                type="checkbox"
                name="venueManager"
                checked={formData.venueManager}
                onChange={handleChange}
              />
              Register as Venue Manager
            </label>
          </InputGroup>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormOverlay>
  );
}

export default AccountForm; 