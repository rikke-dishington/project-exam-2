import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Filters from '../Filters/Filters';
import {
  Overlay,
  DrawerContainer,
  DrawerHeader,
  CloseButton,
  DrawerContent,
  DrawerFooter,
  ApplyButton,
  ClearButton,
} from './FilterDrawer.styles';

function FilterDrawer({ isOpen, onClose, onFilterChange, initialFilters }) {
  const [tempFilters, setTempFilters] = useState(initialFilters);

  useEffect(() => {
    setTempFilters(initialFilters);
  }, [initialFilters]);

  const handleClear = () => {
    const defaultFilters = {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
      maxPrice: 1000,
    };
    setTempFilters(defaultFilters);
    onFilterChange(defaultFilters);
    onClose();
  };

  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <DrawerContainer>
        <DrawerHeader>
          <h2>Filters</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </DrawerHeader>
        <DrawerContent>
          <Filters 
            initialFilters={tempFilters}
            onFilterChange={setTempFilters}
          />
        </DrawerContent>
        <DrawerFooter>
          <ClearButton onClick={handleClear}>
            <FaTimes /> Clear
          </ClearButton>
          <ApplyButton onClick={handleApply}>
            Apply Filters
          </ApplyButton>
        </DrawerFooter>
      </DrawerContainer>
    </>
  );
}

export default FilterDrawer; 