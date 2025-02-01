import { FaUser } from 'react-icons/fa';
import {
  Section,
  SectionTitle,
  HostSection,
  HostInfoWrapper,
  Avatar,
  Name,
} from './styles';

function HostInfo({ owner }) {
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
              <FaUser />
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

export default HostInfo; 