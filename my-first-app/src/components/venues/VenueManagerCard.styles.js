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

export const ImageContainer = styled.div`
  position: relative;
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

export const Stats = styled.div`
  display: flex;
  gap: 1rem;
  
  div {
    text-align: right;
    
    span {
      display: block;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.text.footer};
    }
    
    strong {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
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

export const VenueActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &.delete {
    background: ${({ theme }) => theme.colors.error};
  }
`; 