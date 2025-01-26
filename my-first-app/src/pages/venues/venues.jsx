import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { venueApi } from '../../utils/api';
import VenueCard from '../../components/venues/VenueCard';
import LoadingSpinner from '../../components/shared/LoadingSpinner/LoadingSpinner';
import { 
  Container, 
  Header,
  Title, 
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  ClearButton,
  SearchButton,
  Grid, 
  ErrorMessage,
  FiltersSection,
  FilterButton,
  ActiveFilterDot,
  ResultsInfo,
  ControlsBar,
  ControlsGroup,
  Select,
  ResultCount,
} from './venues.styles';
import { SelectWrapper, SortContainer } from '../../components/shared/SortSelect/SortSelect.styles';
import Filters from '../../components/venues/Filters/Filters';
import FilterDrawer from '../../components/venues/FilterDrawer/FilterDrawer';

function Venues() {
  const [venues, setVenues] = useState([]);
  const [sortedVenues, setSortedVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    maxPrice: 1000,
  });
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setIsLoading(true);
        const query = searchParams.get('q');
        
        if (query) {
          const data = await venueApi.search(query);
          setVenues(data);
        } else {
          const data = await venueApi.getAll();
          setVenues(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [searchParams]);

  useEffect(() => {
    const filterVenues = (venuesList) => {
      return venuesList.filter(venue => {
        // Price filter
        if (venue.price > filters.maxPrice) {
          return false;
        }

        // Get facilities array, ensuring it exists
        const facilities = venue.meta?.facilities || [];

        // Amenities filters
        if (filters.wifi && !venue.meta?.wifi) {
          return false;
        }
        if (filters.parking && !venue.meta?.parking) {
          return false;
        }
        if (filters.breakfast && !venue.meta?.breakfast) {
          return false;
        }
        if (filters.pets && !venue.meta?.pets) {
          return false;
        }

        return true;
      });
    };

    const filteredVenues = filterVenues(venues);

    // Apply sorting
    let sortedResults = [...filteredVenues];
    switch (sortBy) {
      case 'price_low':
        sortedResults.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sortedResults.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setSortedVenues(sortedResults);
  }, [venues, filters, sortBy]);

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    setSearchParams(prev => {
      if (value === 'default') {
        prev.delete('sort');
      } else {
        prev.set('sort', value);
      }
      return prev;
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim(), ...(sortBy !== 'default' && { sort: sortBy }) });
    } else {
      setSearchParams(sortBy !== 'default' ? { sort: sortBy } : {});
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchParams(sortBy !== 'default' ? { sort: sortBy } : {});
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchParams(prev => {
      Object.entries(newFilters).forEach(([key, value]) => {
        if (key === 'maxPrice' && value === 1000) {
          prev.delete(key);
        } else if (value === false) {
          prev.delete(key);
        } else {
          prev.set(key, value.toString());
        }
      });
      return prev;
    });
  };

  const renderSearchBar = () => (
    <SearchContainer onSubmit={handleSearch}>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <ClearButton 
            type="button"
            onClick={handleClearSearch}
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

  const filterProps = {
    onFilterChange: handleFilterChange,
    initialFilters: filters,
    totalResults: sortedVenues.length,
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>Find your perfect stay</Title>
          {renderSearchBar()}
        </Header>
        <LoadingSpinner 
          text={searchParams.get('q') 
            ? `Searching for "${searchParams.get('q')}"...` 
            : 'Loading venues...'
          }
        />
      </Container>
    );
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'maxPrice') return value !== 1000;
    return value === true;
  });

  return (
    <Container>
      <Header>
        <Title>Find your perfect stay</Title>
        {renderSearchBar()}
      </Header>
      
      {venues.length > 0 && (
        <FiltersSection>
          <ResultsInfo>
            <span>{sortedVenues.length} venues found</span>
            <FilterButton onClick={() => setIsFilterDrawerOpen(true)}>
              <FaFilter /> 
              <span>Filters</span>
              {hasActiveFilters && <ActiveFilterDot />}
            </FilterButton>
          </ResultsInfo>

          <FilterDrawer 
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            {...filterProps}
          />
          
          <SortContainer>
            <SelectWrapper>
              <Select value={sortBy} onChange={handleSort}>
                <option value="default">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </Select>
            </SelectWrapper>
          </SortContainer>
        </FiltersSection>
      )}

      {venues.length === 0 ? (
        <ErrorMessage>
          {searchParams.get('q') 
            ? `No venues found matching "${searchParams.get('q')}"`
            : 'No venues available'}
        </ErrorMessage>
      ) : (
        <Grid>
          {sortedVenues.map(venue => (
            <VenueCard 
              key={venue.id} 
              venue={venue} 
            />
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Venues;
