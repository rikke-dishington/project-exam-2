import { FaCheck, FaTimes } from 'react-icons/fa';
import {
  Section,
  SectionTitle,
  List,
  Item,
  Icon,
} from './styles';

function FacilitiesList({ facilities }) {
  return (
    <Section>
      <SectionTitle>Facilities</SectionTitle>
      <List>
        {facilities.map(({ name, available }) => (
          <Item key={name}>
            <Icon available={available}>
              {available ? <FaCheck /> : <FaTimes />}
            </Icon>
            <span>{name}</span>
          </Item>
        ))}
      </List>
    </Section>
  );
}

export default FacilitiesList; 