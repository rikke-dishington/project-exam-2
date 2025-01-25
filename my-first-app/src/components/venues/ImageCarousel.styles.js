import styled from 'styled-components';

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;

  .slick-slider {
    height: 100%;
  }

  .slick-list, .slick-track {
    height: 100%;
  }

  .slick-slide > div {
    height: 100%;
  }

  .slick-dots {
    bottom: 15px;
    
    li button:before {
      color: white;
      opacity: 0.7;
    }
    
    li.slick-active button:before {
      color: white;
      opacity: 1;
    }
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  svg {
    font-size: 1.2rem;
    color: #333;
  }
`; 