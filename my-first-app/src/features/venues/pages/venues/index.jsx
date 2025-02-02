import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { venueApi } from '../../api/venues';
import {
  VenueSearchBar,
  VenueSort,
  VenueFiltersBar,
  VenueGrid,
  VenueFilterDrawer
} from '../../components';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  MainContent,
  ControlsBar,
  SectionTitle,
  Controls,
} from './styles';

/**
 * Venues Page Component
 * 
 * The main venue listing page that displays all available venues with search,
 * sort, and filter capabilities. Provides a comprehensive interface for users
 * to find their perfect accommodation.
 * 
 * Features:
 * - Venue search functionality
 * - Advanced filtering options
 * - Multiple sorting methods
 * - Responsive grid layout
 * - Loading states
 * - Error handling
 * - URL parameter sync
 * - Mobile-friendly interface
 * 
 * State Management:
 * - Manages venue data fetching and filtering
 * - Handles search parameters
 * - Controls sorting state
 * - Manages filter drawer state
 * - Syncs URL with current filters
 * 
 * URL Parameters:
 * - q: Search query
 * - sort: Sorting method
 * - wifi, parking, breakfast, pets: Facility filters
 * - maxPrice: Price filter
 * 
 * @component
 * @example
 * ```jsx
 * <Routes>
 *   <Route path="/venues" element={<Venues />} />
 * </Routes>
 * ```
 */
function Venues() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [sortedVenues, setSortedVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');
  const [filters, setFilters] = useState({
    wifi: searchParams.get('wifi') === 'true',
    parking: searchParams.get('parking') === 'true',
    breakfast: searchParams.get('breakfast') === 'true',
    pets: searchParams.get('pets') === 'true',
    maxPrice: parseInt(searchParams.get('maxPrice')) || 1000,
  });
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  /**
   * Fetches venues based on search parameters
   * Updates venues state and handles loading/error states
   */
  const fetchVenues = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = searchParams.get('q');
      
      const data = query 
        ? await venueApi.search(query)
        : await venueApi.getAll();
      
      setVenues(data);
    } catch (err) {
      setError(err.message || 'Failed to load venues');
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  /**
   * Filters venues based on selected facility and price filters
   * @param {Array} venuesList - List of venues to filter
   * @returns {Array} Filtered venues list
   */
  const filterVenues = useCallback((venuesList) => {
    return venuesList.filter(venue => {
      if (venue.price > filters.maxPrice) {
        return false;
      }

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
  }, [filters]);

  /**
   * Sorts venues based on selected sort method
   * @param {Array} venuesList - List of venues to sort
   * @returns {Array} Sorted venues list
   */
  const sortVenues = useCallback((venuesList) => {
    const sortedResults = [...venuesList];
    switch (sortBy) {
      case 'price_low':
        return sortedResults.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sortedResults.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sortedResults;
    }
  }, [sortBy]);

  useEffect(() => {
    const filteredVenues = filterVenues(venues);
    const sortedResults = sortVenues(filteredVenues);
    setSortedVenues(sortedResults);
  }, [venues, filterVenues, sortVenues]);

  /**
   * Handles sort method changes and updates URL parameters
   * @param {string} value - New sort method
   */
  const handleSort = useCallback((value) => {
    setSortBy(value);
    setSearchParams(prev => {
      if (value === 'default') {
        prev.delete('sort');
      } else {
        prev.set('sort', value);
      }
      return prev;
    });
  }, [setSearchParams]);

  /**
   * Handles search submission and updates URL parameters
   * @param {string} term - Search term
   */
  const handleSearch = useCallback((term) => {
    if (term.trim()) {
      setSearchParams({ q: term.trim(), ...(sortBy !== 'default' && { sort: sortBy }) });
    } else {
      setSearchParams(sortBy !== 'default' ? { sort: sortBy } : {});
    }
  }, [setSearchParams, sortBy]);

  /**
   * Clears search term and updates URL parameters
   */
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchParams(sortBy !== 'default' ? { sort: sortBy } : {});
  }, [setSearchParams, sortBy]);

  /**
   * Handles filter changes and updates URL parameters
   * @param {Object} newFilters - New filter values
   */
  const handleFilterChange = useCallback((newFilters) => {
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
  }, [setSearchParams]);

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'maxPrice') return value !== 1000;
    return value === true;
  });

  /**
   * Handles venue selection and navigation
   * @param {string} id - Venue ID to navigate to
   */
  const handleVenueClick = useCallback((id) => {
    navigate(`/venue/${id}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Title>Find your perfect stay</Title>
            <Subtitle>Hotels, cabins, apartments and much more</Subtitle>
            <VenueSearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </HeaderContent>
        </Header>
        <MainContent>
          <LoadingSpinner 
            text={searchParams.get('q') 
              ? `Searching for "${searchParams.get('q')}"...` 
              : 'Loading venues...'
            }
          />
        </MainContent>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Title>Find your perfect stay</Title>
            <Subtitle>Hotels, cabins, apartments and much more</Subtitle>
            <VenueSearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </HeaderContent>
        </Header>
        <MainContent>
          <div role="alert" className="error-message">{error}</div>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Find your perfect stay</Title>
          <Subtitle>Hotels, cabins, apartments and much more</Subtitle>
          <VenueSearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        </HeaderContent>
      </Header>
      
      <MainContent>
        {venues.length > 0 && (
          <ControlsBar>
            <SectionTitle>Venues</SectionTitle>
            <Controls>
              <VenueFiltersBar 
                hasActiveFilters={hasActiveFilters}
                onFilterClick={() => setIsFilterDrawerOpen(true)}
              />
              <VenueSort 
                sortBy={sortBy}
                onSort={handleSort}
              />
            </Controls>
          </ControlsBar>
        )}

        <VenueFilterDrawer 
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
          totalResults={sortedVenues.length}
        />

        <VenueGrid 
          venues={sortedVenues}
          onVenueClick={handleVenueClick}
          searchQuery={searchParams.get('q')}
        />
      </MainContent>
    </Container>
  );
}

export default Venues;
