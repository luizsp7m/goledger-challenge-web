import styled from "styled-components";

export const Container = styled.button`
  background: ${({ theme }) => theme["primary-color"]};
  padding: ${({ theme }) => theme["gap-3"]} ${({ theme }) => theme["gap-6"]};
  border-radius: 4px;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme["gap-2"]};
  font-size: ${({ theme }) => theme["text-sm"]};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme["primary-color-hover"]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }
`