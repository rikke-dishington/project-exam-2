import { useState, useEffect } from 'react';
import { FaWifi, FaParking, FaCoffee, FaPaw } from 'react-icons/fa';
import {
  FiltersContainer,
  FilterSection,
  SectionTitle,
  FilterGroup,
  FilterOption,
  PriceRange,
  PriceInputs,
  PriceInput,
  CheckboxLabel,
} from './styles';

function Filters({ onFilterChange, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters || {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    maxPrice: 1000,
  });

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleCheckboxChange = (name) => {
    const newFilters = {
      ...filters,
      [name]: !filters[name],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const newFilters = {
      ...filters,
      maxPrice: parseInt(e.target.value, 10),
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <FiltersContainer>
      <FilterSection>
        <SectionTitle>Facilities</SectionTitle>
        <FilterGroup>
          <FilterOption>
            <input
              type="checkbox"
              id="wifi"
              checked={filters.wifi}
              onChange={() => handleCheckboxChange('wifi')}
            />
            <CheckboxLabel htmlFor="wifi">
              <FaWifi className="fa-wifi" /> WiFi
            </CheckboxLabel>
          </FilterOption>
          
          <FilterOption>
            <input
              type="checkbox"
              id="parking"
              checked={filters.parking}
              onChange={() => handleCheckboxChange('parking')}
            />
            <CheckboxLabel htmlFor="parking">
              <FaParking className="fa-parking" /> Parking
            </CheckboxLabel>
          </FilterOption>
          
          <FilterOption>
            <input
              type="checkbox"
              id="breakfast"
              checked={filters.breakfast}
              onChange={() => handleCheckboxChange('breakfast')}
            />
            <CheckboxLabel htmlFor="breakfast">
              <FaCoffee className="fa-coffee" /> Breakfast
            </CheckboxLabel>
          </FilterOption>
          
          <FilterOption>
            <input
              type="checkbox"
              id="pets"
              checked={filters.pets}
              onChange={() => handleCheckboxChange('pets')}
            />
            <CheckboxLabel htmlFor="pets">
              <FaPaw className="fa-paw" /> Pets Allowed
            </CheckboxLabel>
          </FilterOption>
        </FilterGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Price Range</SectionTitle>
        <PriceRange>
          <PriceInputs>
            <PriceInput>
              <span>Max price:</span>
              <span>${filters.maxPrice}</span>
            </PriceInput>
          </PriceInputs>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
        </PriceRange>
      </FilterSection>
    </FiltersContainer>
  );
}

export default Filters;