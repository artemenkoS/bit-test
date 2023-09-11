import { css } from '@mui/material/styles';

export const globalStyle = () => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;

    font-family: 'Mulish', sans-serif;
    font-weight: 400;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input:-webkit-autofill {
    box-shadow: inset 0 0 0 100px #fff;
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 0;
  }
`;
