import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: #2e444e;
  }

  button:hover {
    cursor: pointer;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  a {
    text-decoration: none;
  }

  a:link,
  a:visited {
    color: inherit;
  }

  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }

  #root,
  #__next {
    isolation: isolate;
  }

  html {
    font-size: 62.5%;
  }

  :root {
    --toastify-color-progress-light: #0584ff;
    --toastify-color-progress-dark: #0500ff;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
    background-color: #e5e5e5;
    color: #2e444e;
  }
`;

export default GlobalStyle;
