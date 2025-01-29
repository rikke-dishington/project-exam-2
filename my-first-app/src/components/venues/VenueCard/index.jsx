  <VenueImage>
    {venue.media?.[0] ? (
      <img src={venue.media[0].url} alt={venue.media[0].alt || venue.name} />
    ) : (
      <div className="placeholder">No Image</div>
    )}
  </VenueImage> 