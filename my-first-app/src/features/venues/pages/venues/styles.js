import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
`;

export const Header = styled.div`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary.main} 0%,
    ${({ theme }) => theme.colors.primary.dark} 100%
  );
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  color: ${({ theme }) => theme.colors.primary.contrast};
`;

export const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.contrast};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.primary.contrast};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  opacity: 0.9;
`;

export const SearchContainer = styled.form`
  display: flex;
  max-width: 700px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[10]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  outline: none;
  transition: all ${({ theme }) => theme.transitions.base};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const SearchButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]}`};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.disabled};
    cursor: not-allowed;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.error}15;
  color: ${({ theme }) => theme.colors.error};
  border-radius: 8px;
`;

export const FiltersSection = styled.div`
  margin-bottom: 2rem;
`;

export const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.2s ease;
  min-width: 140px;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.text.secondary};
  }

  svg {
    font-size: 1.1rem;
  }
`;

export const FilterButton = styled(BaseButton)`
  position: relative; // For the ActiveFilterDot
`;

export const Select = styled(BaseButton).attrs({ as: 'select' })`
  appearance: none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;

  option {
    padding: 0.5rem;
  }
`;

export const ControlsGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ResultCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ActiveFilterDot = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
`;

export const VenueCard = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;