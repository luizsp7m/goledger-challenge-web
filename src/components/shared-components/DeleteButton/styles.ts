import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: ${({ theme }) => theme["danger-color"]};
    transition: color 0.15s;
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme["danger-color-hover"]};
    }
  }
`