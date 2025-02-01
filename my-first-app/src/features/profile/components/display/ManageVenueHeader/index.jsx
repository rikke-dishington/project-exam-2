import { FaPlus } from 'react-icons/fa';
import {
  Header,
  CreateButton
} from './styles';

function ManageVenueHeader({ onCreateClick }) {
  return (
    <Header>
      <h1>Manage Venues</h1>
      <CreateButton onClick={onCreateClick}>
        <FaPlus />
        Create New Venue
      </CreateButton>
    </Header>
  );
}

export default ManageVenueHeader; 