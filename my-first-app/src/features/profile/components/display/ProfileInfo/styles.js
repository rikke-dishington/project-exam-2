import styled from 'styled-components';

export const ProfileInfoContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const ProfileContent = styled.div`
  padding: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .bio {
    margin: 1rem 0;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.colors.success}20;
    color: ${({ theme }) => theme.colors.success};
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`; 