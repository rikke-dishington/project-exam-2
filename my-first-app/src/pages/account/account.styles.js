import styled from 'styled-components';

export const AccountContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const AccountHeader = styled.div`
  margin-bottom: 2rem;
`;

export const AccountTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AccountContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 24px;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary.main : 'transparent'};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary.main : '#f0f0f0'};
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
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
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text.footer};
    margin: 0.5rem 0;
  }

  span.badge {
    display: inline-block;
    background: ${({ theme }) => theme.colors.primary.main}20;
    color: ${({ theme }) => theme.colors.primary.main};
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.9rem;
  }

  .venue-manager-toggle {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    
    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
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
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.error}20;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  cursor: pointer;
`;

export const SuccessMessage = styled(ErrorMessage)`
  background-color: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success || '#28a745'};
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${({ secondary, theme }) => 
    secondary ? '#f8f9fa' : theme.colors.primary.main};
  color: ${({ secondary }) => secondary ? '#6c757d' : 'white'};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const EditableField = styled.div`
  margin-bottom: 1rem;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin: 1rem 0;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  width: 60px;
  height: 30px;
  appearance: none;
  background-color: #ccc;
  border-radius: 25px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.4s;
  margin-left: 10px;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:before {
    content: "";
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.4s;
  }

  &:checked:before {
    transform: translateX(30px);
  }
`;
