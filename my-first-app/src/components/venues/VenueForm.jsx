import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import {
  FormOverlay,
  FormContainer,
  Form,
  Title,
  InputGroup,
  Input,
  TextArea,
  ImageSection,
  ImagePreview,
  AddImageButton,
  LocationGroup,
  PriceGroup,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  ErrorMessage,
  ValidationMessage,
  FacilitiesGroup,
  CheckboxGroup
} from './VenueForm.styles';

function VenueForm({ venue, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    media: [],
    price: '',
    maxGuests: '',
    location: {
      address: '',
      city: '',
      zip: '',
      country: '',
      continent: '',
    },
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    }
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name || '',
        description: venue.description || '',
        media: venue.media || [],
        price: venue.price || '',
        maxGuests: venue.maxGuests || '',
        location: {
          address: venue.location?.address || '',
          city: venue.location?.city || '',
          zip: venue.location?.zip || '',
          country: venue.location?.country || '',
          continent: venue.location?.continent || '',
        },
        meta: {
          wifi: venue.meta?.wifi || false,
          parking: venue.meta?.parking || false,
          breakfast: venue.meta?.breakfast || false,
          pets: venue.meta?.pets || false,
        }
      });
    }
  }, [venue]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Venue name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.maxGuests || formData.maxGuests <= 0) {
      newErrors.maxGuests = 'Valid number of guests is required';
    }

    if (!formData.location.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.location.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [group, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [group]: {
          ...prev[group],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageAdd = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl && isValidUrl(imageUrl)) {
      setFormData(prev => ({
        ...prev,
        media: [...prev.media, imageUrl]
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
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

    // Prepare the data for API
    const venueData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      media: formData.media,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      location: {
        address: formData.location.address.trim(),
        city: formData.location.city.trim(),
        zip: formData.location.zip.trim(),
        country: formData.location.country.trim(),
        continent: formData.location.continent.trim(),
      },
      meta: {
        wifi: Boolean(formData.meta.wifi),
        parking: Boolean(formData.meta.parking),
        breakfast: Boolean(formData.meta.breakfast),
        pets: Boolean(formData.meta.pets),
      }
    };

    setIsLoading(true);
    try {
      await onSubmit(venueData);
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
        <Title>{venue ? 'Edit Venue' : 'Create New Venue'}</Title>
        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <h3>Name</h3>
            <Input
              type="text"
              name="name"
              placeholder="Venue Name"
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
            <h3>Description</h3>
            <TextArea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
            {errors.description && (
              <ValidationMessage>
                <FiAlertCircle /> {errors.description}
              </ValidationMessage>
            )}
          </InputGroup>

          <ImageSection>
            <h3>Images</h3>
            <div className="image-grid">
              {formData.media.map((url, index) => (
                <ImagePreview key={index}>
                  <img src={url} alt={`Venue ${index + 1}`} />
                  <button type="button" onClick={() => handleImageRemove(index)}>
                    <FiTrash2 />
                  </button>
                </ImagePreview>
              ))}
              <AddImageButton type="button" onClick={handleImageAdd}>
                <FiPlus />
                Add Image
              </AddImageButton>
            </div>
          </ImageSection>

          <LocationGroup>
            <h3>Location</h3>
            <Input
              type="text"
              name="location.address"
              placeholder="Address"
              value={formData.location.address}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="location.city"
              placeholder="City"
              value={formData.location.city}
              onChange={handleChange}
              error={errors.city}
            />
            {errors.city && (
              <ValidationMessage>
                <FiAlertCircle /> {errors.city}
              </ValidationMessage>
            )}
            <Input
              type="text"
              name="location.country"
              placeholder="Country"
              value={formData.location.country}
              onChange={handleChange}
              error={errors.country}
            />
            {errors.country && (
              <ValidationMessage>
                <FiAlertCircle /> {errors.country}
              </ValidationMessage>
            )}
          </LocationGroup>

          <PriceGroup>
            <InputGroup>
              <h3>Price</h3>
              <Input
                type="number"
                name="price"
                placeholder="Price per night"
                value={formData.price}
                onChange={handleChange}
                min="0"
                error={errors.price}
              />
              {errors.price && (
                <ValidationMessage>
                  <FiAlertCircle /> {errors.price}
                </ValidationMessage>
              )}
            </InputGroup>
            <InputGroup>
              <h3>Guests</h3>
              <Input
                type="number"
                name="maxGuests"
                placeholder="Maximum guests"
                value={formData.maxGuests}
                onChange={handleChange}
                min="1"
                error={errors.maxGuests}
              />
              {errors.maxGuests && (
                <ValidationMessage>
                  <FiAlertCircle /> {errors.maxGuests}
                </ValidationMessage>
              )}
            </InputGroup>
          </PriceGroup>

          <FacilitiesGroup>
            <h3>Facilities</h3>
            <div className="facilities-grid">
              <CheckboxGroup>
                <label>
                  <input
                    type="checkbox"
                    name="meta.wifi"
                    checked={formData.meta.wifi}
                    onChange={handleChange}
                  />
                  WiFi
                </label>
              </CheckboxGroup>

              <CheckboxGroup>
                <label>
                  <input
                    type="checkbox"
                    name="meta.parking"
                    checked={formData.meta.parking}
                    onChange={handleChange}
                  />
                  Parking
                </label>
              </CheckboxGroup>

              <CheckboxGroup>
                <label>
                  <input
                    type="checkbox"
                    name="meta.breakfast"
                    checked={formData.meta.breakfast}
                    onChange={handleChange}
                  />
                  Breakfast
                </label>
              </CheckboxGroup>

              <CheckboxGroup>
                <label>
                  <input
                    type="checkbox"
                    name="meta.pets"
                    checked={formData.meta.pets}
                    onChange={handleChange}
                  />
                  Pets Allowed
                </label>
              </CheckboxGroup>
            </div>
          </FacilitiesGroup>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : venue ? 'Save Changes' : 'Create Venue'}
            </SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              <FiX /> Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormOverlay>
  );
}

export default VenueForm;
