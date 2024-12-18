import styled from "styled-components";

export const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme["gap-3"]};

  div.icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme["background-color-tertiary"]};
    border-radius: 4px;

    height: 128px;
    width: 128px;

    svg {
      font-size: 3rem;
    }
  }

  div.album-information {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme["gap-1"]};
    overflow: hidden;

    h3 {
      font-size: ${({ theme }) => theme["text-lg"]};
      color: ${({ theme }) => theme["text-color-primary"]};
      font-weight: 500;
    }

    a {
      align-self: flex-start;
      font-size: ${({ theme }) => theme["text-sm"]};
      color: ${({ theme }) => theme["text-color-primary"]};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      font-size: ${({ theme }) => theme["text-sm"]};
      color: ${({ theme }) => theme["text-color-secondary"]};
    }
  }

  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;

    div.album-information {
      text-align: center;

      a {
        align-self: center;
      }
    }
  }
`;
