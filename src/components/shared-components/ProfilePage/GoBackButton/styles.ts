import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme["gap-1"]};
  color: ${({ theme }) => theme["text-color-secondary"]};
  transition: color 0.15s ease-in-out;
  cursor: pointer;

  svg {
    font-size: 1rem;
  }

  span {
    font-size: ${({ theme }) => theme["text-sm"]};
  }

  &:hover {
    color: ${({ theme }) => theme["text-color-primary"]};
  }
`;