import styled from 'styled-components';

export const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: white;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

export const ImageSlider = styled.div`
  height: 100%;

  .slick-slider, .slick-list, .slick-track {
    height: 100%;
  }

  .slick-slide > div {
    height: 100%;
  }

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
    font-size: 1.25rem;
  }
`;

export const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};

    svg {
      font-size: 1.2rem;

      &.fa-wifi {
        color: ${({ theme }) => theme.colors.primary};
      }
      &.fa-parking {
        color: ${({ theme }) => theme.colors.primary};
      }
      &.fa-coffee {
        color: #8B4513;
      }
      &.fa-paw {
        color: #FF8C00;
      }
    }
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.footer};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: auto;
  padding-top: 1rem;
  
  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background: white;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.background.hover};
    }

    svg {
      font-size: 1rem;
    }
  }
`;

export const DeleteButton = styled.button`
  background: #dc3545 !important;
  color: white !important;
  border: none !important;

  &:hover {
    background: #c82333 !important;
  }
`; 