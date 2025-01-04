import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const HeaderContainer = styled.header`
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  background: transparent;
  border-radius: 50px;
  padding: 0.7rem 1.5rem;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const IconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 
              0 10px 15px rgba(0, 0, 0, 0.05);
  margin-top: 8px;
  z-index: 1000;
  
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.2s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: visibility 0.2s ease-in-out;
  
  min-width: 250px;
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: #333;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  
  svg {
    font-size: 1.2rem;
    opacity: 0.8;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: #f5f5f5;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  transition: all 0.2s ease;
  font-weight: 500;
  min-width: 120px;
  text-align: center;
  display: inline-block;

  ${({ variant }) => 
    variant === 'filled' ? `
      /* Login button */
      background: #333;
      color: white;
      border: 2px solid #333;
      
      &:hover {
        background: #444;
        border-color: #444;
      }
    ` : variant === 'outline' ? `
      /* Register button */
      color: #333;
      border: 2px solid #333;
      
      &:hover {
        background: #f5f5f5;
      }
    ` : ''
  }
`;
