import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, RequireAuth } from './context/UserContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout';

// Component imports
import Venues from './features/venues/pages/venues';
import Register from './features/auth/pages/register';
import Login from './features/auth/pages/login';
import Profile from './features/profile/pages/profile';
import Bookings from './features/bookings/pages';
import ManageVenues from './features/profile/pages/manage-venues';
import VenuePage from './features/venues/pages/venue';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <GlobalStyle />
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/venues" replace />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/venue/:id" element={<VenuePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/profiles/:name"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/profiles/:name/bookings"
                element={
                  <RequireAuth>
                    <Bookings />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/manage-venues" 
                element={
                  <RequireAuth>
                    <ManageVenues />
                  </RequireAuth>
                } 
              />
            </Routes>
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;