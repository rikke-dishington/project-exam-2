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
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    maxPrice: 1000,
  });
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

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

  const handleSearch = useCallback((term) => {
    if (term.trim()) {
      setSearchParams({ q: term.trim(), ...(sortBy !== 'default' && { sort: sortBy }) });
    } else {
      setSearchParams(sortBy !== 'default' ? { sort: sortBy } : {});
    }
  }, [setSearchParams, sortBy]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchParams(sortBy !== 'default' ? { sort: sortBy } : {});
  }, [setSearchParams, sortBy]);

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
          <div className="error-message">{error}</div>
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
