import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-secondary"]};
  border-bottom: 1px solid ${({ theme }) => theme["border-color"]};

  header {
    height: 70px;
    width: 100%;
    max-width: 1366px;
    padding: 12px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: ${({ theme }) => theme["text-md"]};
    }

    nav {
      display: flex;
      align-items: center;
      gap: 1rem;
      
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