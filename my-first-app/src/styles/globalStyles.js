import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Base styles */
  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-bottom: 60px; /* Add padding for footer height */
  }

  main {
    flex: 1 0 auto;
    margin-bottom: 60px; /* Match footer height */
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Buttons */
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }
`;
