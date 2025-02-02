import { FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  Section,
  SectionTitle,
  List,
  Item,
  Icon,
} from './styles';

/**
 * VenueFacilities Component
 * 
 * A component that displays a list of available and unavailable facilities
 * for a venue. Uses icons to clearly indicate facility status.
 * 
 * Features:
 * - Clear facility status indicators
 * - Consistent list layout
 * - Visual check/cross icons
 * - Semantic list structure
 * - Accessible status information
 * - Color-coded status
 * - Clean typography
 * - Responsive design
 * 
 * @component
 * @example
 * ```jsx
 * <VenueFacilities
 *   facilities={[
 *     { name: 'WiFi', available: true },
 *     { name: 'Parking', available: true },
 *     { name: 'Breakfast', available: false },
 *     { name: 'Pets Allowed', available: false }
 *   ]}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.facilities - Array of facility objects
 * @param {string} props.facilities[].name - Name of the facility
 * @param {boolean} props.facilities[].available - Whether the facility is available
 */
function VenueFacilities({ facilities }) {
  return (
    <Section>
      <SectionTitle>Facilities</SectionTitle>
      <List role="list">
        {facilities.map(({ name, available }) => (
          <Item 
            key={name}
            role="listitem"
          >
            <Icon 
              available={available}
              aria-hidden="true"
            >
              {available ? <FaCheck /> : <FaTimes />}
            </Icon>
            <span>
              {name}
              <span className="sr-only">
                {available ? ' - Available' : ' - Not available'}
              </span>
            </span>
          </Item>
        ))}
      </List>
    </Section>
  );
}

VenueFacilities.propTypes = {
  facilities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired
  })).isRequired
};

export default VenueFacilities; 