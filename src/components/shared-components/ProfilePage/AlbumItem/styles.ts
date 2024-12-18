import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme["gap-3"]};

  cursor: pointer;
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 0.85;
  }

  div.icon-wrapper {
    background: ${({ theme }) => theme["background-color-tertiary"]};
    border-radius: 4px;

    width: 100%;
    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 5rem;
      color: ${({ theme }) => theme["text-color-secondary"]};
    }
  }

  div.album-information {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    h5 {
      font-size: ${({ theme }) => theme["text-sm"]};
      color: ${({ theme }) => theme["text-color-secondary"]};
    }

    span {
      color: ${({ theme }) => theme["text-color-secondary"]};
      font-size: ${({ theme }) => theme["text-sm"]};
      display: block;
    }
  }
`;
