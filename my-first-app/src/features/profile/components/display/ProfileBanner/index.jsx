import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import {
  BannerSection,
  BannerImage,
  AvatarOverlay,
  ProfileAvatar
} from './styles';

/**
 * ProfileBanner Component
 * 
 * Displays a user's profile banner and avatar in a visually appealing layout.
 * Handles both cases where images are provided or fallback placeholders are needed.
 * 
 * Features:
 * - Displays banner image with fallback
 * - Shows avatar with user icon fallback
 * - Overlays avatar on banner
 * - Responsive design
 * - Graceful handling of missing images
 * - Accessible image alternatives
 * 
 * @component
 * @example
 * ```jsx
 * <ProfileBanner
 *   banner={{ url: 'path/to/banner.jpg' }}
 *   avatar={{ url: 'path/to/avatar.jpg' }}
 *   name="John Doe"
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} [props.banner] - Banner image object
 * @param {string} [props.banner.url] - URL of the banner image
 * @param {Object} [props.avatar] - Avatar image object
 * @param {string} [props.avatar.url] - URL of the avatar image
 * @param {string} props.name - User's name for avatar alt text
 */
function ProfileBanner({ banner, avatar, name }) {
  return (
    <BannerSection>
      <BannerImage>
        {banner?.url ? (
          <img src={banner.url} alt="Profile banner" />
        ) : (
          <div className="placeholder-banner" aria-label="Default banner background" />
        )}
      </BannerImage>
      <AvatarOverlay>
        <ProfileAvatar>
          {avatar?.url ? (
            <img src={avatar.url} alt={`${name}'s avatar`} />
          ) : (
            <FaUser aria-label="Default user avatar" />
          )}
        </ProfileAvatar>
      </AvatarOverlay>
    </BannerSection>
  );
}

ProfileBanner.propTypes = {
  banner: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  avatar: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired
};

export default ProfileBanner; 