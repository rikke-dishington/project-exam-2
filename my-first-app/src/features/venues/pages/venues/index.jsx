import { useState, useEffect } from 'react';
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
import { Container, Header, Title } from './styles';

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
    };

    const filteredVenues = filterVenues(venues);

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

  const handleSort = (value) => {
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

  const handleSearch = (term) => {
    if (term.trim()) {
      setSearchParams({ q: term.trim(), ...(sortBy !== 'default' && { sort: sortBy }) });
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

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'maxPrice') return value !== 1000;
    return value === true;
  });

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>Find your perfect stay</Title>
          <VenueSearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
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

  return (
    <Container>
      <Header>
        <Title>Find your perfect stay</Title>
        <VenueSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      </Header>
      
      {venues.length > 0 && (
        <>
          <VenueFiltersBar 
            totalResults={sortedVenues.length}
            hasActiveFilters={hasActiveFilters}
            onFilterClick={() => setIsFilterDrawerOpen(true)}
          />

          <VenueFilterDrawer 
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
            totalResults={sortedVenues.length}
          />
          
          <VenueSort 
            sortBy={sortBy}
            onSort={handleSort}
          />
        </>
      )}

      <VenueGrid 
        venues={sortedVenues}
        onVenueClick={(id) => navigate(`/venue/${id}`)}
        searchQuery={searchParams.get('q')}
      />
    </Container>
  );
}

export default Venues;
