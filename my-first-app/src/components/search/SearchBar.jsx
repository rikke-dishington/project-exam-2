import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import {
  SearchContainer,
  SearchForm,
  InputGroup,
  SearchButton,
} from './SearchBar.styles';

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/venues/search?${queryString}`);
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <InputGroup>
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            value={searchParams.city}
            onChange={handleChange}
            placeholder="Where are you going?"
          />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="checkIn">Check in</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={searchParams.checkIn}
            onChange={handleChange}
          />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="checkOut">Check out</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            onChange={handleChange}
            value={searchParams.checkOut}
          />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="guests">Guests</label>
          <select
            id="guests"
            name="guests"
            value={searchParams.guests}
            onChange={handleChange}
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </InputGroup>
        
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
}

export default SearchBar;