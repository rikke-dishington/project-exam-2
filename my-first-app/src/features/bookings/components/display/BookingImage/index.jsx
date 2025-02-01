import { ImageSection } from './styles';

function BookingImage({ media, venueName }) {
  return (
    <ImageSection>
      {media[0] ? (
        <img 
          src={media[0].url} 
          alt={venueName} 
        />
      ) : (
        <div className="placeholder">No Image</div>
      )}
    </ImageSection>
  );
}

export default BookingImage; 