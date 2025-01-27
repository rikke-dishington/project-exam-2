import Header from '../header/header';
import Footer from '../footer/footer';
import { LayoutContainer, MainContent } from './Layout.styles';

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