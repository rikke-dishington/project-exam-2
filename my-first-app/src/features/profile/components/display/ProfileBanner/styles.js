import styled from 'styled-components';

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