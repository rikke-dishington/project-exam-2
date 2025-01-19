import styled from 'styled-components';
import { FormOverlay } from './VenueForm.styles';

export const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const VenueCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const VenueImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const VenueInfo = styled.div`
  padding: 1rem;

  h3 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0.25rem 0;
    color: ${({ theme }) => theme.colors.text.footer};
    
    &.price {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: 600;
      font-size: 1.1rem;
    }
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
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &.delete {
    background: ${({ theme }) => theme.colors.error};
  }
`;

export const AddVenueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text.footer};
  
  p:first-child {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  p:last-child {
    font-size: 0.9rem;
  }
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text.footer};
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.error}20;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

export const SuccessMessage = styled(ErrorMessage)`
  background-color: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success || '#28a745'};
  cursor: pointer;
`;

export const ConfirmDialog = styled(FormOverlay)`
  > div {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    text-align: center;

    h3 {
      margin-top: 0;
      color: ${({ theme }) => theme.colors.text.primary};
    }

    p {
      color: ${({ theme }) => theme.colors.text.footer};
      margin: 1rem 0;
    }
  }
`;

export const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  button.cancel {
    background: #6c757d;
  }
`;
