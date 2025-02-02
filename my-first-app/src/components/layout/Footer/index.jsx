import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLink,
  Copyright,
  SocialLinks,
  SocialLink,
} from './styles';

/**
 * Footer Component
 * 
 * The site footer component that provides navigation links, social media connections,
 * and copyright information. Organized in a multi-column layout with distinct sections.
 * 
 * Features:
 * - Multi-column layout
 * - Organized content sections
 * - Dynamic copyright year
 * - Social media links
 * - Navigation links
 * 
 * Sections:
 * 1. Company Information:
 *    - About Us
 *    - Terms & Conditions
 * 
 * 2. Support:
 *    - Contact information
 * 
 * 3. User Actions:
 *    - Property listing
 *    - Login access
 * 
 * 4. Social Media:
 *    - Instagram link
 * 
 * @component
 * @example
 * ```jsx
 * function App() {
 *   return (
 *     <div>
 *       <main>Content</main>
 *       <Footer />
 *     </div>
 *   );
 * }
 * ```
 */
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