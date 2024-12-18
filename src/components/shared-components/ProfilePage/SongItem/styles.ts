import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-tertiary"]};
  border-radius: 4px;
  padding: ${({ theme }) => theme["p-3"]} ${({ theme }) => theme["p-6"]};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: ${({ theme }) => theme["gap-3"]};

  div.grid-item-1,
  div.grid-item-2,
  div.grid-item-3 {
    overflow: hidden;

    a,
    span {
      color: ${({ theme }) => theme["text-color-secondary"]};
      font-size: ${({ theme }) => theme["text-sm"]};
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  div.grid-item-1 {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme["gap-3"]};

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

      h5 {
        font-size: ${({ theme }) => theme["text-sm"]};
        color: ${({ theme }) => theme["text-color-secondary"]};
      }
    }
  }

  div.grid-item-2 {
    text-align: center;
  }

  div.grid-item-3 {
    text-align: end;
  }

  @media (max-width: 768px) {
    display: flex;

    div.grid-item-1 {
      flex: 1;
    }

    div.grid-item-2 {
      display: none;
    }

    div.grid-item-3 {
      width: auto;
    }
  }
`;
