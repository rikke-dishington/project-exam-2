import PropTypes from 'prop-types';
import {
  ProfileInfoContainer,
  ProfileContent
} from './styles';

/**
 * ProfileInfo Component
 * 
 * Displays detailed user profile information including name, email,
 * optional bio, and venue manager status.
 * 
 * Features:
 * - Displays user's name and email
 * - Shows optional bio if available
 * - Displays venue manager badge when applicable
 * - Responsive layout
 * - Clean and organized information display
 * 
 * @component
 * @example
 * ```jsx
 * <ProfileInfo
 *   user={{
 *     name: 'John Doe',
 *     email: 'john@stud.noroff.no',
 *     bio: 'Love to travel and explore new places',
 *     venueManager: true
 *   }}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User object containing profile information
 * @param {string} props.user.name - User's display name
 * @param {string} props.user.email - User's email address
 * @param {string} [props.user.bio] - Optional user biography
 * @param {boolean} [props.user.venueManager] - Whether user is a venue manager
 */
function ProfileInfo({ user }) {
  return (
    <ProfileInfoContainer>
      <ProfileContent>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {user.bio && <p className="bio">{user.bio}</p>}
        {user.venueManager && <p className="badge">Venue Manager</p>}
      </ProfileContent>
    </ProfileInfoContainer>
  );
}

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string,
    venueManager: PropTypes.bool
  }).isRequired
};

export default ProfileInfo; 