import { useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import {
  Modal,
  ModalContent,
  Header,
  CloseButton,
  Form,
  InputGroup,
  Label,
  Input,
  TextArea,
  ImageList,
  ImageItem,
  AddImageButton,
  ErrorMessage,
  SubmitButton,
  Checkbox,
  Grid
} from './styles';

function VenueModal({ venue, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: venue?.name || '',
    description: venue?.description || '',
    media: venue?.media || [],
    price: venue?.price || '',
    maxGuests: venue?.maxGuests || '',
    location: {
      address: venue?.location?.address || '',
      city: venue?.location?.city || '',
      zip: venue?.location?.zip || '',
      country: venue?.location?.country || '',
      continent: venue?.location?.continent || '',
    },
    meta: {
      wifi: venue?.meta?.wifi || false,
      parking: venue?.meta?.parking || false,
      breakfast: venue?.meta?.breakfast || false,
      pets: venue?.meta?.pets || false,
    }
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e) => {
    setHasChanges(true);
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
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

  const handleAddImage = () => {
    if (!newImageUrl) return;
    
    try {
      const url = new URL(newImageUrl);
      if (url.protocol !== 'https:') {
        setError('Please enter a secure (https) image URL');
        return;
      }
      
      const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(url.pathname);
      if (!isImage) {
        setError('URL must point to an image file');
        return;
      }

      setFormData(prev => ({
        ...prev,
        media: [...prev.media, {
          url: newImageUrl,
          alt: `Image of ${formData.name || 'venue'}`
        }]
      }));
      setNewImageUrl('');
      setError(null);
    } catch (err) {
      setError('Please enter a valid image URL');
    }
  };

  const handleRemoveImage = (index) => {
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
      if (!formData.name) throw new Error('Name is required');
      if (!formData.price) throw new Error('Price is required');
      if (Number(formData.price) <= 0) throw new Error('Price must be greater than 0');
      if (!formData.maxGuests) throw new Error('Max guests is required');
      if (Number(formData.maxGuests) <= 0) throw new Error('Max guests must be greater than 0');
      if (!formData.location.city) throw new Error('City is required');
      if (!formData.location.country) throw new Error('Country is required');

      const venueData = {
        name: String(formData.name),
        description: String(formData.description || ''),
        media: formData.media.filter(url => url),
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests),
        location: {
          address: String(formData.location.address || ''),
          city: String(formData.location.city),
          zip: String(formData.location.zip || ''),
          country: String(formData.location.country),
          continent: String(formData.location.continent || '')
        },
        meta: {
          wifi: Boolean(formData.meta.wifi),
          parking: Boolean(formData.meta.parking),
          breakfast: Boolean(formData.meta.breakfast),
          pets: Boolean(formData.meta.pets)
        }
      };

      console.log('Submitting venue data:', venueData);
      await onSave(venueData);
      onClose();
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Modal onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>{venue ? 'Edit Venue' : 'Create New Venue'}</h2>
          <CloseButton onClick={handleClose}>
            <FaTimes />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Venue Name *</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter venue name"
            />
          </InputGroup>

          <InputGroup>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your venue"
              rows="4"
            />
          </InputGroup>

          <Grid>
            <InputGroup>
              <Label>Price per night *</Label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </InputGroup>

            <InputGroup>
              <Label>Max Guests *</Label>
              <Input
                type="number"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                min="1"
              />
            </InputGroup>
          </Grid>

          <InputGroup>
            <Label>Images</Label>
            <Grid>
              <Input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <AddImageButton type="button" onClick={handleAddImage}>
                <FaImage /> Add
              </AddImageButton>
            </Grid>
            <ImageList>
              {formData.media.map((image, index) => (
                <ImageItem key={index}>
                  <img src={image.url} alt={image.alt} />
                  <button type="button" onClick={() => handleRemoveImage(index)}>
                    <FaTimes />
                  </button>
                </ImageItem>
              ))}
            </ImageList>
          </InputGroup>

          <h3>Location</h3>
          <Grid>
            <InputGroup>
              <Label>Address</Label>
              <Input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>City *</Label>
              <Input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>ZIP Code</Label>
              <Input
                type="text"
                name="location.zip"
                value={formData.location.zip}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>Country *</Label>
              <Input
                type="text"
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>Continent</Label>
              <Input
                type="text"
                name="location.continent"
                value={formData.location.continent}
                onChange={handleChange}
              />
            </InputGroup>
          </Grid>

          <h3>Amenities</h3>
          <Grid>
            <Checkbox>
              <input
                type="checkbox"
                name="meta.wifi"
                checked={formData.meta.wifi}
                onChange={handleChange}
              />
              <span>WiFi</span>
            </Checkbox>

            <Checkbox>
              <input
                type="checkbox"
                name="meta.parking"
                checked={formData.meta.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </Checkbox>

            <Checkbox>
              <input
                type="checkbox"
                name="meta.breakfast"
                checked={formData.meta.breakfast}
                onChange={handleChange}
              />
              <span>Breakfast</span>
            </Checkbox>

            <Checkbox>
              <input
                type="checkbox"
                name="meta.pets"
                checked={formData.meta.pets}
                onChange={handleChange}
              />
              <span>Pets Allowed</span>
            </Checkbox>
          </Grid>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : venue ? 'Save Changes' : 'Create Venue'}
          </SubmitButton>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default VenueModal; 