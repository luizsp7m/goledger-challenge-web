import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-tertiary"]};
  border-radius: 4px;
  padding: ${({ theme }) => theme["p-3"]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme["gap-2"]};
  overflow: hidden;

  span {
    color: ${({ theme }) => theme["text-color-secondary"]};
    font-size: ${({ theme }) => theme["text-sm"]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > div {
    display: flex;
    background: ${({ theme }) => theme["background-color-secondary"]};
    width: 42px;
    height: 42px;
    border-radius: 36px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 1.25rem;
      color: ${({ theme }) => theme["text-color-secondary"]};
    }
  }
`;