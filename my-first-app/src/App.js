import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, RequireAuth } from './context/UserContext'; // Updated path
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';

// Component imports
import Venues from './pages/venues/venues';
import Register from './pages/register/register';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Navigate to="/venues" replace />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;