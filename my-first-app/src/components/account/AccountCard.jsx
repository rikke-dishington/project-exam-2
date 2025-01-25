import { FiEdit2, FiMail, FiAward } from 'react-icons/fi';
import {
  Card,
  ImageContainer,
  Avatar,
  Info,
  TitleRow,
  Stats,
  ButtonGroup,
  EditButton,
  Bio
} from './AccountCard.styles';

function AccountCard({ profile, onEdit }) {
  return (
    <Card>
      <ImageContainer>
        <Avatar 
          src={profile.avatar?.url || profile.avatar || '/placeholder-avatar.jpg'} 
          alt={profile.name} 
        />
      </ImageContainer>

      <Info>
        <TitleRow>
          <h3>{profile.name}</h3>
        </TitleRow>

        <Stats>
          <span>
            <FiMail />
            {profile.email}
          </span>
          {profile.venueManager && (
            <span>
              <FiAward />
              Venue Manager
            </span>
          )}
        </Stats>

        {profile.bio && (
          <Bio>{profile.bio}</Bio>
        )}

        <ButtonGroup>
          <EditButton onClick={onEdit}>
            <FiEdit2 /> Edit Profile
          </EditButton>
        </ButtonGroup>
      </Info>
    </Card>
  );
}

export default AccountCard; 