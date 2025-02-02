import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ available, theme }) => 
    available ? theme.colors.success : theme.colors.error};

  svg {
    font-size: 1.2rem;
  }
`; 