import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import { UserProvider } from './contexts/UserContext';

// Component imports
import Venues from './pages/venues/venues';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Navigate to="/venues" replace />} />
            <Route path="/venues" element={<Venues />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;