import styled from 'styled-components'

export const Container = styled.div`
  > main {
    height: calc(100vh - 70px);
    overflow-y: auto;
    
    div.container {
      min-height: 100%;
      width: 100%;
      max-width: 1152px;
      margin: 0 auto;

      padding: ${({ theme }) => theme['p-3']};

      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme['gap-3']};
    }
  }
`
