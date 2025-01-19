import { useState, useEffect } from 'react';
import { FiX, FiSave, FiPlus } from 'react-icons/fi';
import {
  FormOverlay,
  FormContainer,
  FormHeader,
  FormBody,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  ErrorMessage,
  ImagePreview,
  ImageUpload
} from './VenueForm.styles';

function VenueForm({ venue = null, onSubmit, onClose }) {
  const initialState = {
    name: '',
    description: '',
    media: [],
    price: '',
    maxGuests: '',
    location: {
      address: '',
      city: '',
      country: '',
      continent: '',
      zip: ''
    },
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false
    }
  };

  const [formData, setFormData] = useState(venue || initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (venue) {
      setFormData(venue);
    }
  }, [venue]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.name || !formData.price || !formData.maxGuests) {
        throw new Error('Please fill in all required fields');
      }

      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormOverlay>
      <FormContainer>
        <FormHeader>
          <h2>{venue ? 'Edit Venue' : 'Add New Venue'}</h2>
          <button onClick={onClose}><FiX /></button>
        </FormHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FormBody onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Venue Name *</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </FormGroup>

          <FormGroup>
            <Label>Price per night *</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Max Guests *</Label>
            <Input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              min="1"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
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
            />
            <Input
              type="text"
              name="location.country"
              placeholder="Country"
              value={formData.location.country}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Amenities</Label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="meta.wifi"
                  checked={formData.meta.wifi}
                  onChange={handleChange}
                />
                WiFi
              </label>
              <label>
                <input
                  type="checkbox"
                  name="meta.parking"
                  checked={formData.meta.parking}
                  onChange={handleChange}
                />
                Parking
              </label>
              <label>
                <input
                  type="checkbox"
                  name="meta.breakfast"
                  checked={formData.meta.breakfast}
                  onChange={handleChange}
                />
                Breakfast
              </label>
              <label>
                <input
                  type="checkbox"
                  name="meta.pets"
                  checked={formData.meta.pets}
                  onChange={handleChange}
                />
                Pets Allowed
              </label>
            </div>
          </FormGroup>

          <FormGroup>
            <Label>Images</Label>
            <ImageUpload>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                id="venue-images"
                hidden
              />
              <label htmlFor="venue-images">
                <FiPlus /> Add Images
              </label>
            </ImageUpload>
            <div className="image-previews">
              {formData.media.map((url, index) => (
                <ImagePreview key={index}>
                  <img src={url} alt={`Venue preview ${index + 1}`} />
                  <button type="button" onClick={() => removeImage(index)}>
                    <FiX />
                  </button>
                </ImagePreview>
              ))}
            </div>
          </FormGroup>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              <FiSave /> {isLoading ? 'Saving...' : 'Save Venue'}
            </SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              <FiX /> Cancel
            </CancelButton>
          </ButtonGroup>
        </FormBody>
      </FormContainer>
    </FormOverlay>
  );
}

export default VenueForm;
