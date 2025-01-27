import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLink,
  Copyright,
  SocialLinks,
  SocialLink,
} from './footer.styles';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Holidaze</FooterTitle>
          <FooterLink to="/">About Us</FooterLink>
          <FooterLink to="/">Terms & Conditions</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLink to="/">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Join Us</FooterTitle>
          <FooterLink to="/register">List your property</FooterLink>
          <FooterLink to="/login">Login</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Holidaze. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;