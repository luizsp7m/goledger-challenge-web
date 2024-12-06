import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme["gap-3"]};

  div.icon-container {
    background: ${({ theme }) => theme["background-color-tertiary"]};
    width: 96px;
    height: 96px;
    border-radius: 96px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 2rem;
    }
  }

  div.body {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme["gap-1"]};

    span {
      text-align: center;

      &.title {
        font-size: ${({ theme }) => theme["text-md"]};
      }

      &.subtitle {
        font-size: ${({ theme }) => theme["text-sm"]};
        color: ${({ theme }) => theme["text-color-secondary"]};
      }
    }
  }
`;