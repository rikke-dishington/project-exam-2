import styled from 'styled-components';

export const FiltersContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

export const FilterSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export const FilterGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

export const FilterOption = styled.div`
  display: flex;
  align-items: center;
  
  input[type="checkbox"] {
    display: none;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    font-size: 1.2rem;
    
    /* Specific colors for each icon */
    &.fa-wifi {
      color: ${({ theme }) => theme.colors.facilities.wifi};
    }
    &.fa-parking {
      color: ${({ theme }) => theme.colors.facilities.parking};
    }
    &.fa-coffee {
      color: ${({ theme }) => theme.colors.facilities.breakfast};
    }
    &.fa-paw {
      color: ${({ theme }) => theme.colors.facilities.pets};
    }
  }

  input:checked + & {
    background: ${({ theme }) => theme.colors.primary.main}15;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const PriceRange = styled.div`
  padding: 0.5rem;
`;

export const PriceInputs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

export const PriceInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  span:last-child {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ResultCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: 1rem;
`;

export const ClearButtonContainer = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

export const ClearFiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.text.secondary};
  }

  svg {
    font-size: 0.8rem;
  }
`;

export const RangeSlider = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;

  input[type="range"] {
    position: absolute;
    width: 100%;
    -webkit-appearance: none;
    pointer-events: none;
    background: none;
    height: 100%;
    margin: 0;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      pointer-events: auto;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      cursor: pointer;
      margin-top: -8px;
    }

    &::-moz-range-thumb {
      pointer-events: auto;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }
`;

export const RangeTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
`;

export const GuestCounter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const GuestLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const CounterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  svg {
    font-size: 0.75rem;
  }
`;

export const CounterValue = styled.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

export const Select = styled.select`
  appearance: none;
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 1200px;
  margin: 0 auto 1rem auto;
`; 