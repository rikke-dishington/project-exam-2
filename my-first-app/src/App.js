import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import { UserProvider } from './contexts/UserContext';

// Component imports
import Header from './components/layout/header/header';
import Footer from './components/layout/footer/footer';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Venues from './pages/venues/venues';
import Venue from './pages/venue/venue';
import Account from './pages/account/account';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venue/:id" element={<Venue />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;