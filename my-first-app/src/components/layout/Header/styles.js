import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0 2rem;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: 0 auto;
  max-width: 1920px;
  min-width: 320px;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: transform 0.2s ease;
  padding: 0.5rem 0;

  &:hover {
    transform: scale(1.05);
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 2rem;
`;

export const NavLink = styled(Link)`
  color: ${({ theme, $active }) => $active ? theme.colors.primary.main : theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary.main};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    &:after {
      transform: scaleX(1);
    }
  }
`;

export const AuthLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const AuthLink = styled(Link)`
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${({ $primary, theme }) => $primary ? `
    background: ${theme.colors.primary.main};
    color: white;
    
    &:hover {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
    }
  ` : `
    color: ${theme.colors.text.primary};
    
    &:hover {
      color: ${theme.colors.primary.main};
    }
  `}
`;

export const MenuContainer = styled.div`
  position: relative;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    font-weight: 500;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main}10;
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.main}20;
  color: ${({ theme }) => theme.colors.primary.main};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: dropdownFade 0.2s ease;

  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  font-size: 1rem;
  
  svg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;
