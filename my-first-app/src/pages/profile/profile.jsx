import { useUser } from '../../context/UserContext';
import { Container, ProfileHeader, ProfileInfo } from './profile.styles';

function Profile() {
  const { user } = useUser();

  return (
    <Container>
      <ProfileHeader>
        <h1>Profile</h1>
      </ProfileHeader>
      <ProfileInfo>
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          {user.venueManager && <p>Venue Manager: Yes</p>}
        </div>
      </ProfileInfo>
    </Container>
  );
}

export default Profile; 