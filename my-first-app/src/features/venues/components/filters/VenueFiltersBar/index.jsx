import { FaFilter } from 'react-icons/fa';
import {
  FiltersSection,
  FilterButton,
  ActiveFilterDot
} from './styles';

function VenueFiltersBar({ hasActiveFilters, onFilterClick }) {
  return (
    <FiltersSection>
      <FilterButton onClick={onFilterClick}>
        <FaFilter /> 
        <span>Filters</span>
        {hasActiveFilters && <ActiveFilterDot />}
      </FilterButton>
    </FiltersSection>
  );
}

export default VenueFiltersBar; 