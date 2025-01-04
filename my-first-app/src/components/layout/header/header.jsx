import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle, FaHeart, FaBookmark, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useClickOutside } from '../../../hooks/useClickOutside';
import {
  HeaderContainer,
  Logo,
  MenuContainer,
  IconGroup,
  IconWrapper,
  DropdownMenu,
  MenuItem,
  NavLinks,
  NavLink
} from './header.styles';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuRef = useClickOutside(isMenuOpen, setIsMenuOpen);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <HeaderContainer>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Logo>Holidaze</Logo>
      </Link>
      
      {isLoggedIn ? (
        <MenuContainer ref={menuRef}>
          <IconGroup onClick={toggleMenu}>
            <IconWrapper>
              <FaBars size={22} />
            </IconWrapper>
            <IconWrapper>
              <FaUserCircle size={26} />
            </IconWrapper>
          </IconGroup>
          
          <DropdownMenu isOpen={isMenuOpen}>
            <MenuItem as={Link} to="/favorites">
              <FaHeart /> Favorites
            </MenuItem>
            <MenuItem as={Link} to="/bookings">
              <FaBookmark /> Bookings
            </MenuItem>
            <MenuItem as={Link} to="/account">
              <FaUser /> Account
            </MenuItem>
            <MenuItem as="button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </MenuItem>
          </DropdownMenu>
        </MenuContainer>
      ) : (
        <NavLinks>
          <NavLink as={Link} to="/register" variant="outline">
            Register
          </NavLink>
          <NavLink as={Link} to="/login" onClick={handleLogin} variant="filled">
            Login
          </NavLink>
        </NavLinks>
      )}
    </HeaderContainer>
  );
}

export default Header;
