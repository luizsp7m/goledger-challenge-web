import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-tertiary"]};
  border-radius: 4px;
  padding: ${({ theme }) => theme["p-3"]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme["gap-3"]};
  overflow: hidden;

  cursor: pointer;
  transition: opacity 0.10s ease-in-out;

  &:hover {
    opacity: 0.85;
  }

  div.icon-wrapper {
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

  div.album-information {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    overflow: hidden;

    h5 {
      font-size: ${({ theme }) => theme["text-sm"]};
      color: ${({ theme }) => theme["text-color-secondary"]};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span {
      color: ${({ theme }) => theme["text-color-secondary"]};
      font-size: ${({ theme }) => theme["text-sm"]};
      display: block;
    }
  }
`;