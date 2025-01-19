import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import { logout } from '../../../utils/api/auth';
import {
  HeaderContainer,
  Logo,
  NavLinks,
  NavLink,
  AccountDropdown,
  DropdownContent,
  DropdownItem
} from './header.styles';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    updateUser(null);
    setIsOpen(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo>Holidaze</Logo>
      </Link>
      
      <NavLinks>
        {!user ? (
          <>
            <Link to="/login">
              <NavLink variant="outline">Login</NavLink>
            </Link>
            <Link to="/register">
              <NavLink variant="filled">Register</NavLink>
            </Link>
          </>
        ) : (
          <AccountDropdown ref={dropdownRef}>
            <NavLink 
              variant="filled"
              onClick={() => setIsOpen(!isOpen)}
            >
              Account
            </NavLink>
            <DropdownContent isOpen={isOpen}>
              <Link to="/account">
                <DropdownItem onClick={() => setIsOpen(false)}>
                  My Account
                </DropdownItem>
              </Link>
              <DropdownItem onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownContent>
          </AccountDropdown>
        )}
      </NavLinks>
    </HeaderContainer>
  );
}

export default Header;
