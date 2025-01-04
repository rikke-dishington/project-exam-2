import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import Header from './components/layout/header/header';
import Footer from './components/layout/footer/footer';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;