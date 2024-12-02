import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    font-weight: 500;
  }

  button {
    background: ${({ theme }) => theme["primary-color"]};
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 14px;

    &:hover {
      background: ${({ theme }) => theme["primary-color-hover"]};
    }
  }
`;