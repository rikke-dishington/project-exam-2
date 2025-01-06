import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import Header from './components/layout/header/header';
import Footer from './components/layout/footer/footer';
import Home from './pages/home/home';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;