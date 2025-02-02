import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { FaUser, FaSignOutAlt, FaList, FaHome } from 'react-icons/fa';
import {
  HeaderContainer,
  Nav,
  Logo,
  AuthLinks,
  AuthLink,
  MenuContainer,
  IconGroup,
  DropdownMenu,
  MenuItem,
  UserAvatar
} from './styles';

/**
 * Header Component
 * 
 * The main navigation header component that provides site branding and user controls.
 * Adapts its display based on user authentication state and role.
 * 
 * Features:
 * - Responsive navigation
 * - Dynamic user menu
 * - Authentication state handling
 * - Role-based menu items
 * - Dropdown menu for user actions
 * 
 * States:
 * - Menu open/closed state
 * - Authentication state
 * - Venue manager role state
 * 
 * Navigation Options:
 * Unauthenticated:
 * - Login link
 * - Register link
 * 
 * Authenticated:
 * - Profile dropdown menu
 * - Bookings link
 * - Venues management (for venue managers)
 * - Logout option
 * 
 * @component
 * @example
 * ```jsx
 * function App() {
 *   return (
 *     <div>
 *       <Header />
 *       <main>Content</main>
 *     </div>
 *   );
 * }
 * ```
 */
function Header() {
  const { user, logout } = useUser();
  const isVenueManager = user?.venueManager || false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Handles user logout action
   * Clears user session, closes menu, and redirects to home
   */
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  /**
   * Closes the dropdown menu
   */
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          Holidaze
        </Logo>

        <AuthLinks>
          {user ? (
            <MenuContainer>
              <IconGroup onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <UserAvatar>
                  <FaUser />
                </UserAvatar>
                <span>{user.name}</span>
              </IconGroup>

              <DropdownMenu isOpen={isMenuOpen} onClick={(e) => e.stopPropagation()}>
                <MenuItem 
                  as={Link} 
                  to={`/profiles/${user.name}`} 
                  onClick={closeMenu}
                  $iconColor="primary"
                >
                  <FaUser />
                  Profile
                </MenuItem>
                <MenuItem 
                  as={Link} 
                  to={`/profiles/${user.name}/bookings`} 
                  onClick={closeMenu}
                  $iconColor="warning"
                >
                  <FaList />
                  Bookings
                </MenuItem>
                {isVenueManager && (
                  <MenuItem 
                    as={Link} 
                    to="/manage-venues" 
                    onClick={closeMenu}
                    $iconColor="success"
                  >
                    <FaHome />
                    Venues
                  </MenuItem>
                )}
                <MenuItem 
                  as="button" 
                  onClick={handleLogout}
                  $iconColor="error"
                >
                  <FaSignOutAlt />
                  Logout
                </MenuItem>
              </DropdownMenu>
            </MenuContainer>
          ) : (
            <>
              <AuthLink to="/login">Login</AuthLink>
              <AuthLink to="/register" $primary>Register</AuthLink>
            </>
          )}
        </AuthLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
