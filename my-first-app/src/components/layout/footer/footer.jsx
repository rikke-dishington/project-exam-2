import { FooterContainer, Copyright } from './footer.styles';

function Footer() {
  return (
    <FooterContainer>
      <Copyright>
        © {new Date().getFullYear()} Holidaze. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;