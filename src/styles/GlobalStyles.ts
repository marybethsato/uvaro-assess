import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-family: 'Arial', sans-serif;
    background-color: #f2f2f2;
    color: #333;
    overflow-x: hidden; /* 가로 스크롤 방지 */
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Mobile First */
  body {
    font-size: 16px;
    line-height: 1.5;
  }
`;

export default GlobalStyles;
