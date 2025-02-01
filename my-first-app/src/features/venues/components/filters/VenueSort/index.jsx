import { SelectWrapper, Select } from './styles';

function VenueSort({ sortBy, onSort }) {
  return (
    <SelectWrapper>
      <Select value={sortBy} onChange={(e) => onSort(e.target.value)}>
        <option value="default">Recommended</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </Select>
    </SelectWrapper>
  );
}

export default VenueSort; 