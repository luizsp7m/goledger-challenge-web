import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme['background-color-secondary']};
    color: ${({ theme }) => theme['text-color-primary']};
  }

  body, input, button, select {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
  }

  button {
    border: 0;
    outline: 0;
    background: 0;
    cursor: pointer;
    color: ${({ theme }) => theme["text-color-primary"]};
    transition: opacity ease-in-out 0.15s;
    
    &:hover {
      opacity: 0.75;
    }
  }
`
