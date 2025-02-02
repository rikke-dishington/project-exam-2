import { FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  Section,
  SectionTitle,
  HostSection,
  HostInfoWrapper,
  Avatar,
  Name,
} from './styles';

/**
 * VenueHostInfo Component
 * 
 * A component that displays information about the venue's host/owner.
 * Shows the host's avatar and name with appropriate fallbacks.
 * 
 * Features:
 * - Host avatar display
 * - Fallback avatar icon
 * - Host name display
 * - Anonymous fallback
 * - Clean layout
 * - Responsive design
 * - Accessible images
 * - Consistent styling
 * 
 * @component
 * @example
 * ```jsx
 * <VenueHostInfo
 *   owner={{
 *     name: "John Smith",
 *     avatar: {
 *       url: "avatar.jpg",
 *       alt: "John Smith's profile picture"
 *     }
 *   }}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} [props.owner] - Owner information
 * @param {string} [props.owner.name] - Name of the host
 * @param {Object} [props.owner.avatar] - Avatar information
 * @param {string} [props.owner.avatar.url] - URL of the avatar image
 * @param {string} [props.owner.avatar.alt] - Alt text for the avatar image
 */
function VenueHostInfo({ owner }) {
  return (
    <Section>
      <SectionTitle>Host</SectionTitle>
      <HostSection>
        <HostInfoWrapper>
          <Avatar>
            {owner?.avatar?.url ? (
              <img 
                src={owner.avatar.url} 
                alt={owner.avatar.alt || `${owner.name}'s avatar`} 
              />
            ) : (
              <FaUser aria-hidden="true" />
            )}
          </Avatar>
          <div>
            <Name>{owner?.name || 'Anonymous Host'}</Name>
          </div>
        </HostInfoWrapper>
      </HostSection>
    </Section>
  );
}

VenueHostInfo.propTypes = {
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  })
};

export default VenueHostInfo; 