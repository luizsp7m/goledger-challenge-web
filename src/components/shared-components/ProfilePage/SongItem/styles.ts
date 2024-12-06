import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-tertiary"]};
  border-radius: 4px;
  padding: ${({ theme }) => theme["p-3"]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme["gap-3"]};

  div.left-side {
    flex: 1;
    overflow: hidden;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme["gap-3"]};

    span {
      color: ${({ theme }) => theme["text-color-secondary"]};
      font-size: ${({ theme }) => theme["text-sm"]};
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

    div.song-information {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      overflow: hidden;

      h5, span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      h5 {
        font-size: ${({ theme }) => theme["text-sm"]};
        color: ${({ theme }) => theme["text-color-secondary"]};
      }

      span {
        display: block;
        color: ${({ theme }) => theme["text-color-secondary"]};
        font-size: ${({ theme }) => theme["text-sm"]};
      }
    }
  }

  div.right-side {
    span {
      color: ${({ theme }) => theme["text-color-secondary"]};
      font-size: ${({ theme }) => theme["text-sm"]};
    }
  }
`;