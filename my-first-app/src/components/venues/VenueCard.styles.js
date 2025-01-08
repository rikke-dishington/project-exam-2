import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

export const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: white;
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  ${StyledLink}:hover & {
    transform: translateY(-2px);
  }

  ${StyledLink}:active & {
    transform: translateY(0);
  }
`;

export const ImageSlider = styled.div`
  .slick-dots {
    bottom: 10px;
    
    li button:before {
      color: white;
    }
    
    li.slick-active button:before {
      color: white;
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    
    &:before {
      font-size: 24px;
    }
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const Info = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
  
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Rating = styled.div`
  span {
    color: ${({ theme }) => theme.colors.accent.light};
  }
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Location = styled.p`
  color: ${({ theme }) => theme.colors.text.footer};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const Price = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: auto;
  padding-top: 1rem;
  
  span {
    font-weight: bold;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const HeartButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding: 4px;
  
  svg {
    color: white;
    font-size: 1.5rem;
    filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.5));
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;