import Header from '../Header';
import Footer from '../Footer';
import { LayoutContainer, MainContent } from './styles';

/**
 * Layout Component
 * 
 * The main layout wrapper component that provides consistent structure across all pages.
 * Implements a standard layout with header, main content area, and footer.
 * 
 * Features:
 * - Consistent header across all pages
 * - Flexible main content area
 * - Consistent footer across all pages
 * - Responsive design
 * - Proper semantic HTML structure
 * 
 * Layout Structure:
 * - Header (navigation and user controls)
 * - Main content (flexible area for page content)
 * - Footer (site information and links)
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered in the main area
 * 
 * @example
 * ```jsx
 * function App() {
 *   return (
 *     <Layout>
 *       <HomePage />
 *     </Layout>
 *   );
 * }
 * ```
 */
function Layout({ children }) {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout; 