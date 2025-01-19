import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const AccountContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const AccountHeader = styled.div`
  margin-bottom: 2rem;
`;

export const AccountTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AccountContent = styled.div`
  padding: 2rem;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background.light};
`;

export const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ active, theme }) => active ? theme.colors.primary.main : theme.colors.text.primary};
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.colors.primary.main : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarUpload = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.primary.main};
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const UserInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
  }

  p {
    margin: 0.25rem 0 0 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const UserInfo = styled.div`
  flex: 1;

  h2 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .badge {
    display: inline-block;
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.main};
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const BookingsSection = styled.div``;

export const VenuesSection = styled.div``;

export const BannerImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const Bio = styled.p`
  margin: 1rem 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.error}10;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.success}10;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
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

export const EditableField = styled.div`
  margin: 1rem 0;

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    input[type="checkbox"] {
      width: auto;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const CancelButton = styled(SaveButton)`
  background: ${({ theme }) => theme.colors.error};
`;

export const BookingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  .booking-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    h3 {
      margin: 0 0 1rem 0;
      color: ${({ theme }) => theme.colors.primary.main};
      font-size: 1.2rem;
    }

    p {
      margin: 0.5rem 0;
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: 0.95rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .venue-details {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  /* Message for no bookings */
  > div:not(.booking-card) {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1.1rem;
  }
`;

export const VenuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  .venue-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    h3 {
      margin: 0 0 1rem 0;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    p {
      margin: 0.5rem 0;
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

export const AddVenueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  p {
    margin: 0.5rem 0;
    
    &:first-child {
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
`;
