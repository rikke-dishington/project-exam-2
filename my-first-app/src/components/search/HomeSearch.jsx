import SearchBar from './SearchBar';
import { HomeSearchWrapper, SearchTitle } from './SearchBar.styles';

function HomeSearch() {
  return (
    <HomeSearchWrapper>
      <SearchTitle>Book your next holiday here</SearchTitle>
      <SearchBar />
    </HomeSearchWrapper>
  );
}

export default HomeSearch;