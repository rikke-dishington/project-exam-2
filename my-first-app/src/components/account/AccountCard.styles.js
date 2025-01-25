import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Stats = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;

    svg {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }

  svg {
    font-size: 1rem;
  }
`;

export const Bio = styled.p`
  margin: 1rem 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.95rem;
`; 