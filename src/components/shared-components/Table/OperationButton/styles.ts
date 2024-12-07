import styled, { css } from "styled-components";
import { OperationButtonProps } from ".";

interface ContainerProps {
  $operationType: OperationButtonProps["operationType"]
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transition: color 0.15s;
  }

  ${({ $operationType }) => $operationType == "view" && css`
    color: #b2bec3;

    &:hover {
      color: #dfe6e9;
    }
  `}

  ${({ $operationType }) => $operationType == "update" && css`
    color: #0984e3;

    &:hover {
      color: #74b9ff;
    }
  `}
  
  ${({ $operationType }) => $operationType == "delete" && css`
    color: ${({ theme }) => theme["danger-color"]};

    &:hover {
      color: ${({ theme }) => theme["danger-color-hover"]};
    }
  `}
`