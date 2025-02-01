import { FaFilter } from 'react-icons/fa';
import {
  FiltersSection,
  ResultsInfo,
  FilterButton,
  ActiveFilterDot
} from './styles';

function VenueFiltersBar({ totalResults, hasActiveFilters, onFilterClick }) {
  return (
    <FiltersSection>
      <ResultsInfo>
        <span>{totalResults} venues found</span>
        <FilterButton onClick={onFilterClick}>
          <FaFilter /> 
          <span>Filters</span>
          {hasActiveFilters && <ActiveFilterDot />}
        </FilterButton>
      </ResultsInfo>
    </FiltersSection>
  );
}

export default VenueFiltersBar; 