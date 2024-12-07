import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme["border-color"]}; 
    }
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
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
