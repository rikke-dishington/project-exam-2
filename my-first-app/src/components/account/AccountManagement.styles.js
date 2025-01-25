import styled from 'styled-components';

export const ProfileSection = styled.section`
  margin-bottom: 2rem;
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
  margin: 1rem 0;

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 1rem;
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const UserInfoHeader = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0 0 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const Bio = styled.p`
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.5;

  &:empty {
    display: none;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.error}10;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.success}10;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const ConfirmDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 400px;
  width: 90%;
`;

export const ConfirmButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: ${({ variant }) => 
    variant === 'danger' 
      ? ({ theme }) => theme.colors.error 
      : ({ theme }) => theme.colors.primary.main};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`; 