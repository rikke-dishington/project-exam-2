import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { BsHouseDoor } from 'react-icons/bs';
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
} from './header.styles';

function Header() {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

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
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <FaUser />
                  )}
                </UserAvatar>
                <span>{user.name}</span>
              </IconGroup>

              <DropdownMenu isOpen={isMenuOpen} onClick={(e) => e.stopPropagation()}>
                <MenuItem as={Link} to="/profile" onClick={closeMenu}>
                  <FaUser />
                  Profile
                </MenuItem>
                <MenuItem as={Link} to="/bookings" onClick={closeMenu}>
                  <BsHouseDoor />
                  My Bookings
                </MenuItem>
                {user?.venueManager && (
                  <MenuItem as={Link} to="/manage-venues" onClick={closeMenu}>
                    <BsHouseDoor />
                    Manage Venues
                  </MenuItem>
                )}
                <MenuItem as="button" onClick={handleLogout}>
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
