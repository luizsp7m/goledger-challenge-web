import styled from 'styled-components'

export const Container = styled.div`
  > main {
    height: ${({ theme }) => `calc(100vh - ${theme['header-height']})`};
    overflow-y: auto;
    
    div.container {
      min-height: 100%;
      width: 100%;
      max-width: ${({ theme }) => theme["content-max-width"]};
      margin: 0 auto;

      padding: ${({ theme }) => theme['p-3']};

      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme['gap-3']};
    }
  }
`
