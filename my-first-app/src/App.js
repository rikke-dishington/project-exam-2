import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, RequireAuth } from './context/UserContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout/Layout';

// Component imports
import Venues from './pages/venues/venues';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Bookings from './pages/bookings';
import ManageVenues from './pages/manage-venues/manage-venues';
import VenuePage from './pages/venue/index';

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