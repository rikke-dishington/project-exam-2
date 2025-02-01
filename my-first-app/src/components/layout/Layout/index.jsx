import Header from '../Header';
import Footer from '../Footer';
import { LayoutContainer, MainContent } from './styles';

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