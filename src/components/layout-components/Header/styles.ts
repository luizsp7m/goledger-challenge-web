import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-primary"]};

  header {
    height: 70px;
    width: 100%;
    max-width: 1152px;
    padding: ${({ theme }) => theme["p-3"]};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: ${({ theme }) => theme["text-md"]};
      font-weight: 500;
    }

    nav {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme["gap-4"]};
      
      a {
        color: ${({ theme }) => theme["text-color-secondary"]};
        font-size: ${({ theme }) => theme["text-sm"]};
        text-decoration: none;
        transition: color 0.15s;

        &:hover {
          color: ${({ theme }) => theme["text-color-primary"]};
        }
      }
    }
  }
`;