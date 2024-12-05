import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["p-3"]};

  div.header {
    display: flex;
    gap: ${({ theme }) => theme["p-3"]};
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: ${({ theme }) => theme["text-md"]};
      font-weight: 500;
    }

    button {
      background: ${({ theme }) => theme["primary-color"]};
      padding: ${({ theme }) => theme["p-3"]} ${({ theme }) => theme["p-4"]};
      border-radius: 4px;
      font-size: ${({ theme }) => theme["text-sm"]};

      &:hover {
        background: ${({ theme }) => theme["primary-color-hover"]};
      }
    }
  }

  div.operations {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme["p-3"]};
    align-items: center;
    
    form {
      flex: 1;
    }

    div.sort-by {
      width: 100%;
      max-width: 256px;
    }
  }
`;