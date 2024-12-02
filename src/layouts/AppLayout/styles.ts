import styled from 'styled-components'

export const Container = styled.div`
  main {
    height: calc(100vh - 70px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme["border-color"]}; 
    }

    > div.content {
      width: 100%;
      max-width: 1152px;
      margin: 0 auto;
      padding: 12px;

      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
`
