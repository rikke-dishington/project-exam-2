import styled from 'styled-components';

export const ImageSection = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
`;

export const VenueImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => direction === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
  background: rgba(0, 0, 0, 0.5);
  color: white;
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
    background: rgba(0, 0, 0, 0.7);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ImageDots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
`;

export const ImageDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.8)'};
  }
`; 