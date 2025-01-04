import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  text-align: center;

  ${props => props.variant === 'filled' && `
    background-color: ${props.theme.colors.primary.main} !important;
    color: #FFFFFF !important;
    border: 2px solid ${props.theme.colors.primary.main} !important;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `}

  ${props => props.variant === 'outline' && `
    background-color: transparent !important;
    color: ${props.theme.colors.primary.main} !important;
    border: 2px solid ${props.theme.colors.primary.main} !important;
    
    &:hover {
      background-color: transparent !important;
      transform: translateY(-2px);
    }
  `}

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const MenuContainer = styled.div`
  position: relative;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  background: transparent;
  border-radius: 50px;
  padding: 0.7rem 1.5rem;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    transition: all 0.2s ease;
  }

  &:hover {
    background: transparent;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 1.5rem;
  color: #333;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  width: 100%;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  
  svg {
    font-size: 1.3rem;
    transition: all 0.2s ease;
    stroke-width: 2.5px;
    fill: transparent;
    
    &[data-icon="heart"] {
      stroke: ${({ theme }) => theme.colors.accent.main};
    }
    
    &:not([data-icon="heart"]) {
      stroke: ${({ theme }) => theme.colors.primary.main};
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: #f5f5f5;
  }
`;
