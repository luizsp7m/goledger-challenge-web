import styled, { css } from "styled-components";

interface ContainerProps {
  $alternativeStyle: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme["gap-2"]};
  padding: 3rem;

  ${({ $alternativeStyle }) =>
    $alternativeStyle &&
    css`
      flex-direction: row;
      background: rgba(255, 118, 117, 0.15);
      padding: 1rem;
      border-radius: 4px;
    `}

  svg {
    color: ${({ theme }) => theme["danger-color"]};
    font-size: 2.25rem;
  }

  span {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }

  a {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};

    &:hover {
      opacity: 0.85;
    }
  }
`;
