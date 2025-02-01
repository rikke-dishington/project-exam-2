import { FaUser } from 'react-icons/fa';
import {
  BannerSection,
  BannerImage,
  AvatarOverlay,
  ProfileAvatar
} from './styles';

function ProfileBanner({ banner, avatar, name }) {
  return (
    <BannerSection>
      <BannerImage>
        {banner?.url ? (
          <img src={banner.url} alt="Profile banner" />
        ) : (
          <div className="placeholder-banner" />
        )}
      </BannerImage>
      <AvatarOverlay>
        <ProfileAvatar>
          {avatar?.url ? (
            <img src={avatar.url} alt={name} />
          ) : (
            <FaUser />
          )}
        </ProfileAvatar>
      </AvatarOverlay>
    </BannerSection>
  );
}

export default ProfileBanner; 