import {
  ProfileInfoContainer,
  ProfileContent
} from './styles';

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

export default ProfileInfo; 