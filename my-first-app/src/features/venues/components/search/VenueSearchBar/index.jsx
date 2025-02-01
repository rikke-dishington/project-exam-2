import { FaSearch, FaTimes } from 'react-icons/fa';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  ClearButton,
  SearchButton
} from './styles';

function SearchBar({ searchTerm, onSearchChange, onSearch, onClear }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <ClearButton 
            type="button"
            onClick={onClear}
            aria-label="Clear search"
          >
            <FaTimes />
          </ClearButton>
        )}
      </SearchInputWrapper>
      <SearchButton type="submit">
        <FaSearch />
      </SearchButton>
    </SearchContainer>
  );
}

export default SearchBar; 