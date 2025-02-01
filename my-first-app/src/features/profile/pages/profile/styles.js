import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ProfileHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1rem;
  }
`;

export const ProfileInfo = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const ProfileModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;

  h2 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ImagePreview = styled.div`
  margin-top: 0.5rem;
  border-radius: ${({ $isAvatar }) => ($isAvatar ? '50%' : '4px')};
  overflow: hidden;
  width: ${({ $isAvatar }) => ($isAvatar ? '100px' : '100%')};
  height: ${({ $isAvatar }) => ($isAvatar ? '100px' : '150px')};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
  }

  span {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 1rem;
  text-align: center;
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Avatar = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const AvatarUpload = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;

  input[type="file"] {
    display: none;
  }
`;

export const UploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 1rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BannerSection = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 4rem;
`;

export const BannerImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-banner {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.background.secondary} 0%,
      ${({ theme }) => theme.colors.background.primary} 100%
    );
  }
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  left: 2rem;
  bottom: -3rem;
  padding: 4px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ProfileContent = styled.div`
  padding: 0 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .bio {
    margin: 1rem 0;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.colors.primary.main}20;
    color: ${({ theme }) => theme.colors.primary.main};
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`; 