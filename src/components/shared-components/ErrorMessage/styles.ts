import styled, { css } from "styled-components";

interface ContainerProps {
  $withPadding: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme["gap-2"]};

  ${({ $withPadding }) => $withPadding && css`
    padding: 3rem;
  `}

  svg {
    color: ${({ theme }) => theme["danger-color"]};
    font-size: 2.25rem;
  }

  span {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }
`;