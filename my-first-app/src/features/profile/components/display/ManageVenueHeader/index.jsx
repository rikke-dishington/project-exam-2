import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import {
  Header,
  CreateButton
} from './styles';

/**
 * ManageVenueHeader Component
 * 
 * Header component for the venue management section that displays
 * the title and provides a button to create new venues.
 * 
 * Features:
 * - Clear section title
 * - Create venue button with icon
 * - Clean and minimal design
 * - Responsive layout
 * - Accessible button with icon
 * 
 * @component
 * @example
 * ```jsx
 * <ManageVenueHeader
 *   onCreateClick={() => setIsCreateModalOpen(true)}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onCreateClick - Callback when create button is clicked
 */
function ManageVenueHeader({ onCreateClick }) {
  return (
    <Header>
      <h1>Manage Venues</h1>
      <CreateButton 
        onClick={onCreateClick}
        aria-label="Create new venue"
      >
        <FaPlus aria-hidden="true" />
        Create New Venue
      </CreateButton>
    </Header>
  );
}

ManageVenueHeader.propTypes = {
  onCreateClick: PropTypes.func.isRequired
};

export default ManageVenueHeader; 