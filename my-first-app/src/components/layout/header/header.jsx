import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHeart, 
  FiBookmark, 
  FiUser, 
  FiLogOut, 
  FiMenu 
} from 'react-icons/fi';
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
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);  // This should switch to the logged-in view
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
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
              <FiMenu size={22} />
            </IconWrapper>
            <IconWrapper>
              <FiUser size={26} />
            </IconWrapper>
          </IconGroup>
          
          <DropdownMenu isOpen={isMenuOpen}>
            <MenuItem as={Link} to="/favorites">
              <FiHeart data-icon="heart" /> Favorites
            </MenuItem>
            <MenuItem as={Link} to="/bookings">
              <FiBookmark /> Bookings
            </MenuItem>
            <MenuItem as={Link} to="/account">
              <FiUser /> Account
            </MenuItem>
            <MenuItem as="button" onClick={handleLogout}>
              <FiLogOut /> Logout
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
